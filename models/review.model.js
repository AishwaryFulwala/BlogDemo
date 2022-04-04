const reviews = require('../schema/review.mongo');
const mongoose = require('mongoose');

const likeDislikePost = async (pid, uid) => {
    if(!mongoose.Types.ObjectId.isValid(pid))
        return { error: 'Invalid Post ID.' };

    const res = await reviews.find({
        postID: pid,
        userID: uid
    });

    if(res.length === 0){
        const newReview = new reviews({
            like: true,
            comment: "",
            postID: pid,
            userID: uid
        });
        return await newReview.save();
    }
    else {
        return await reviews.updateOne({
            postID: pid,
            userID: uid
        }, {
            like: !res[0].like,
            comment: "",
            postID: pid,
            userID: uid
        })
    }    
};

const commentPost = async (pid, uid, cmt) => {
    if(!mongoose.Types.ObjectId.isValid(pid))
        return { error: 'Invalid Post ID.' };

    const res = await reviews.find({
        postID: pid,
        userID: uid
    });

    if(res.length === 0){
        const newReview = new reviews({
            like: true,
            comment: cmt,
            postID: pid,
            userID: uid
        });
        return await newReview.save();
    }
    else {
        return await reviews.updateOne({
            postID: pid,
            userID: uid
        }, {
            like: res[0].like,
            comment: cmt,
            postID: pid,
            userID: uid
        })
    }    
};

module.exports = {
    likeDislikePost,
    commentPost
};