const mongoose = require('mongoose');

const posts = require('../schema/post.mongo');
const reviews = require('../schema/review.mongo');

const createPost = async (post) => {
    const newPost = new posts(post);
    return await newPost.save();
};

const updatePost = async (id, post) => {
   if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Post ID.' };

    return await posts.updateOne({ _id: id }, post);
}

const deletePost = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Post ID.' };

    return await posts.deleteOne({ _id: id });
}

const getAllPost = async () => {
    return await posts.find();
};

const getPostByTopic = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Topic ID.' };

    return await posts.find({
        topicID: id
    });
};

const getMostRecentPost = async () => {
    return await posts.find().sort({ postDate: -1 }).limit(10);
};

const getMostLikedPost = async () => {
    return await posts.aggregate([
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'postID',
                as: 'review',
                pipeline: [ 
                    {
                        $match: {
                            'like': true
                        }
                    } 
                ]
            }
        },
        {
            $unwind: {
                path: '$review',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'topics',
                localField: 'topicID',
                foreignField: '_id',
                as: 'topic',
            }
        },
        {
            $unwind: {
                path: '$topic',
                preserveNullAndEmptyArrays: true
            }
        },
        { 
            $group: {
                _id: {
                    postID: '$review.postID',
                    postName: '$postName',
                    description: '$description',
                    postDate: '$postDate',
                    userID: '$userID',
                    topicName: '$topic.topicName',
                },
                children: {
                    $push: {
                        like: '$review.like',
                        comment: '$review.comment',
                    },                   
                },
                count: { $sum: 1 } 
            }
        },
        {
            $sort: {
                'count': -1
            }
        }
    ]);
};

module.exports = {
    createPost,
    getAllPost,
    updatePost,
    deletePost,
    getPostByTopic,
    getMostRecentPost,
    getMostLikedPost
};