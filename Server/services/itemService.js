const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helper/responseHelper');
const validate = require('validate.js');


const constraints = {
    title: {
        length:{
            minimum: 2,
            maxumim: 100,
            tooShort: '^Title must be atleast %{count} characters long',
            tooLong: 'Title cant be longer than %{count} charactes long'
        }
    }
};

async function getById(id) {
    try {
        const item = await db.item.findOne({
            where: {id},
            include: [
                db.user, 
                {
                    model: db.bid, 
                    include: [db.user] 
                }
            ]
        });
        return createResponseSuccess(_formatItem(item));
    } catch (error){
        return createResponseError(error.status, error.message);
    }
}

async function getAll(){
    try {
        const allItems = await db.item.findAll({
            include: [
            db.user, db.bid, 
                    
            ]});
        return createResponseSuccess(allItems.map(item => _formatItem(item)));
    } catch (error){
        return createResponseError(error.status, error.message);
    }
}
            // id = id , bid = object med userId och amount
async function addBid(id, bid){
    console.log('id',id,'bid',bid)
    if(!id){
        return createResponseError(422, 'Id is required');
    } 
    const item = await db.item.findOne({
        where: {id},
        include: [db.bid]
    });
    let lowBid = false;
    
    const itembids = item.bids;
    if (itembids) {
    itembids.map((oldBid) => {
        if (oldBid.amount >= bid.amount) {
            console.log(item.startingPrice, bid.amount)
            lowBid = true;

        }
    })
    }
    if (item.startingPrice > bid.amount) {
        console.log(item.startingPrice, bid.amount)
        lowBid = true;
    }

    if (lowBid) {
        return createResponseError(422, 'Ditt bud måste vara högre än det senaste budet');
    } else {
    try {
        bid.itemId = id;
        const newBid = await db.bid.create(bid);
        return createResponseSuccess(newBid);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}
}

async function create(item){
    const invalidData = validate(item, constraints);
    if(invalidData){
        return createResponseError(422, invalidData);
    }   
    try {
        if (!item.imageUrl || item.imageUrl=="") {
            item.imageUrl = "https://i.imgur.com/ha5A03x.jpg";
        }
        //sätter endDate till 30 dagar efter nuvarande tiden
        let time = new Date();
        item.endDate = time.setDate(time.getDate() + 30)
        const newItem = await db.item.create(item);
        

        return createResponseSuccess(newItem);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
    
}

async function update(item, id){
    const invalidData = validate(item, constraints);
    if(!id) {
        return createResponseError(422, 'Id is required');
    }
    if(invalidData) {
        return createResponseError(422, invalidData);
    }
    try {
        const existingItem = await db.item.findOne({where: {id}});
        if(!existingItem) {
            return createResponseError(404, 'No item was found.');
        }
        await db.item
        .update(item,
        {
            where: { 
                id: id 
            }
        });
        return createResponseMessage(200, 'item was updated.');
    } catch(error) {
        return createResponseError(error.status, error.message);
    }

}

async function destroy(id){
    if(!id) {
        return createResponseError(422, 'Id is required');
    }
    try {
        await db.item.destroy({
            where: {id}
        });
        return createResponseMessage(200, 'item was deleted.');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }

}

// fixar till formateringen av item
function _formatItem(item) {
    const cleanItem = {
        id: item.id,
        title: item.title,
        startingPrice: item.startingPrice,
        imageUrl: item.imageUrl,
        description: item.description,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        endDate: item.endDate,
        seller: {
            id: item.user.id,
            email: item.user.email,
            firstName: item.user.firstName,
            lastName: item.user.lastName
        }
    };
    //om item har bid
    if (item.bids) {
        //lägger till bid i cleanitem som en tom array
        cleanItem.bids = [];
        //loppar igenom bids med map, map=loop, mappar bids till cleanitem
        item.bids.map((bid) => {
            
            return(cleanItem.bids = [bid.amount, ...cleanItem.bids]);
        });
        return cleanItem;
        };
    } 

module.exports = {
    getById,
    getAll,
    addBid,
    create,
    update,
    destroy
};