const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helper/responseHelper');
const validate = require('validate.js');
const item = require('../models/item');

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

async function addBid(id, bid){
    if(!id){
        return createResponseError(422, 'Id is required');
    } 
    const item = await db.item.findOne({
        where: {id},
        include: [db.bid]
    });
    const itembids = item.bids;
    let lowBid = false;
    itembids.map((oldBid) => {
        if (item.startingPrice > bid.amount ||  oldBid.amount > bid.amount) {
            console.log(item.startingPrice, bid.amount)
            lowBid = true;
        }
    })
    if (lowBid) {
        return createResponseError(422, 'Ditt bud måste vara högre än det senaste budet');
    }
    try {
        bid.itemId = id;
        const newBid = await db.bid.create(bid);
        return createResponseSuccess(newBid);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function create(item){
    const invalidData = validate(item, constraints);
    if(invalidData){
        return createResponseError(422, invalidData);
    }   
    try {
        //await inväntar skapandet
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
        description: item.description,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
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

async function _findOrCreateBidId(name) {
    name = name.toLowerCase().trim();
    const foundOrCreateBid = await db.bid.findOrCreate({where: {name}});

    return foundOrCreateBid[0].id;
}

async function _addbidToitem(item, bids) {
    if ( bids ) {
        bids.forEach(async (bid) => {
            const bidId = await _findOrCreatebidId(bid);
            await item.addbid(bidId);
        });
    }
}
module.exports = {
    getById,
    getAll,
    addBid,
    create,
    update,
    destroy
};