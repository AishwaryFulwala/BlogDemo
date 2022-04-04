const reviewModel = require('../models/review.model');

const express = require('express');
const reviewRouter = express.Router();

const likeDislikePost = async (req, res) => {
    const pid = req.params.id;

    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    uid = req.user._id;
    return res.status(200).json(await reviewModel.likeDislikePost(pid, uid));
};

const commentPost = async (req, res) => {
    const pid = req.params.id;
    const cmt = req.body;

    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    uid = req.user._id;
    return res.status(200).json(await reviewModel.commentPost(pid, uid, cmt.comment));
};

reviewRouter.post('/likeDislikePost/:id', likeDislikePost);
reviewRouter.post('/commentPost/:id', commentPost);

module.exports = reviewRouter;