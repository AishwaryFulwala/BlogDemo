const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topicName: String,
    description: String,
    userID: [{ type: mongoose.Schema.ObjectId, ref: 'users'}],
    postID: [{ type: mongoose.Schema.ObjectId, ref: 'posts'}]
});

module.exports = mongoose.model('Topic', topicSchema);