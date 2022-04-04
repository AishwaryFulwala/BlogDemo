const mongoose = require("mongoose");

const postSchema =new mongoose.Schema({
    postName: String,
    description: String,
    postDate: Date,
    topicID: mongoose.Schema.ObjectId,
    userID: mongoose.Schema.ObjectId,
});

module.exports =  mongoose.model('Post', postSchema);