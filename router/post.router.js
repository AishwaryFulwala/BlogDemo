const postModel = require('../models/post.model');

const express = require('express');
const postRouter = express.Router();

const createPost = async (req, res) => {
    const post = req.body;

    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    post.userID = req.user._id;
    return res.status(200).json(await postModel.createPost(post));
};

const updatePost = async (req, res) => {
    const post = req.body;
    const id = req.params.id;

    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const modify = await postModel.updatePost(id, post);

    if(modify.matchedCount)
        return res.status(200).json(modify);
    else
        return res.status(404).json({ error: 'Post dosen\'t exists.' });
};

const deletePost = async (req, res) => {
    const id = req.params.id;

    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const modify = await postModel.deletePost(id);

    if(modify.deletedCount)
        return res.status(200).json(modify);
    else
        return res.status(404).json({ error: 'Post dosen\'t exists.' });
};

const getAllPost = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const get = await postModel.getAllPost();

    if(get.length > 0)
        return res.status(200).json(get);
    else
        return res.status(404).json({ error: 'No Post Found.' });
};

const getPostByTopic = async (req, res) => {
    const id = req.params.id;

    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const get = await postModel.getPostByTopic(id);

    if(get.length > 0)
        return res.status(200).json(get);
    else
        return res.status(404).json({ error: 'No Post Found.' });
};

const getMostRecentPost = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const get = await postModel.getMostRecentPost();

    if(get.length > 0)
        return res.status(200).json(get);
    else
        return res.status(404).json({ error: 'No Post Found.' });
};


const getMostLikedPost = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    return res.status(200).json(await postModel.getMostLikedPost());
};

postRouter.post('/createPost', createPost);
postRouter.put('/updatePost/:id', updatePost);
postRouter.delete('/deletePost/:id', deletePost);
postRouter.get('/getAllPost', getAllPost);
postRouter.get('/getPostByTopic/:id', getPostByTopic);
postRouter.get('/getMostRecentPost', getMostRecentPost);
postRouter.get('/getMostLikedPost', getMostLikedPost);

module.exports = postRouter;