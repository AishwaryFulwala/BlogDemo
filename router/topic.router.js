const topicModel = require('../models/topic.model');

const express = require('express');

const topicRouter = express.Router();

const create = async (req, res) => {
    const topic = req.body;

    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    topic.userID = req.user._id;
    return res.status(200).json(await topicModel.createTopic(topic));
};

const allTopic = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const get = await topicModel.getTopic();

    if(get.length > 0)
        return res.status(200).json(get);
    else
        return res.status(404).json({ error: 'No Topic Found.' });
};

topicRouter.post('/createTopic', create);
topicRouter.get('/topic', allTopic);

module.exports = topicRouter;