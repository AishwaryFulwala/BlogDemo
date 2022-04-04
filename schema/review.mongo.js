const mongoose = require("mongoose");

const reviewSchema =new mongoose.Schema({
    like: Boolean,
    comment: String,
    userID: mongoose.Schema.ObjectId,
    postID: mongoose.Schema.ObjectId,
});

module.exports =  mongoose.model('Review', reviewSchema);