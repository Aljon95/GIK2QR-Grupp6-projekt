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
        const post = await db.post.findOne({
            where: {id},
            include: [
                db.user, 
                db.tag, 
                {
                    model: db.comment, 
                    include: [db.user] 
                }
            ]
        });
        return createResponseSuccess(_formatPost(post));
    } catch (error){
        return createResponseError(error.status, error.message);
    }
}

async function getAll(){
    try {
        const allPosts = await db.post.findAll({include: [db.user, db.tag]});
        return createResponseSuccess(allPosts.map(post => _formatPost(post)));
    } catch (error){
        return createResponseError(error.status, error.message);
    }
}

async function addComment(id, comment){
    if(!id){
        return createResponseError(422, 'Id is required');
    }   
    try {
        comment.postId = id;
        const newComment = await db.comment.create(comment);
        return createResponseSuccess(newComment);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function create(post){
    const invalidData = validate(post, constraints);
    if(invalidData){
        return createResponseError(422, invalidData);
    }   
    try {
        //await inväntar skapandet
        const newPost = await db.post.create(post);


        await _addTagToPost(newPost, post.tags);
        return createResponseSuccess(newPost);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
    
}

async function update(post, id){
    const invalidData = validate(post, constraints);
    if(!id) {
        return createResponseError(422, 'Id is required');
    }
    if(invalidData) {
        return createResponseError(422, invalidData);
    }
    try {
        const existingPost = await db.post.findOne({where: {id}});
        if(!existingPost) {
            return createResponseError(404, 'No post was found.');
        }
        await _addTagToPost(existingPost, post.tags);
        await db.post
        .update(post,
        {
            where: { 
                id: id 
            }
        });
        return createResponseMessage(200, 'Post was updated.');
    } catch(error) {
        return createResponseError(error.status, error.message);
    }

}

async function destroy(id){
    if(!id) {
        return createResponseError(422, 'Id is required');
    }
    try {
        await db.post.destroy({
            where: {id}
        });
        return createResponseMessage(200, 'Post was deleted.');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }

}

// fixar till formateringen av inlägget
function _formatPost(post) {
    const cleanPost = {
        id: post.id,
        title: post.title,
        body: post.body,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
            id: post.user.id,
            username: post.user.username,
            email: post.user.email,
            firstName: post.user.firstName,
            lastName: post.user.lastName,
            imageUrl: post.user.imageUrl
        },
        tags: []
    };
    //om inlägget har kommentarer
    if (post.comments) {
        //lägger till comment i cleanPost som en tom array
        cleanPost.comments = [];
        //loppar igenom comments med map, map=loop, mappar comments till cleanPost
        post.comments.map((comment) => {
            return (cleanPost.comments = [
                {
                    title: comment.title,
                    body: comment.body,
                    author: comment.user.username,
                    createdAt: comment.createdAt
                },
                //spread operatorn för att lägga till alla kommentarer i samma array
                ...cleanPost.comments
            ]);
        });
    } 
    // samma som med kommentarerna
    if (post.tags) {
        post.tags.map((tag) => {
            
            return(cleanPost.tags = [tag.name, ...cleanPost.tags]);
        });
        return cleanPost;
    }
}

async function _findOrCreateTagId(name) {
    name = name.toLowerCase().trim();
    const foundOrCreateTag = await db.tag.findOrCreate({where: {name}});

    return foundOrCreateTag[0].id;
}

async function _addTagToPost(post, tags) {
    if ( tags ) {
        tags.forEach(async (tag) => {
            const tagId = await _findOrCreateTagId(tag);
            await post.addTag(tagId);
        });
    }
}
module.exports = {
    getByTag,
    getByAuthor,
    getById,
    getAll,
    addComment,
    create,
    update,
    destroy
};