const topics = require('../schema/topic.mongo');

const createTopic = async (topic) => {
    const newTopic = new topics(topic);
    return await newTopic.save();
};

const getTopic = async () => {
    return await topics.find();
};

module.exports = {
    createTopic,
    getTopic
};