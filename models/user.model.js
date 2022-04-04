const users = require('../schema/user.mongo');

const registerUser = async (user) => {
    const newUser = new users(user);
    return await newUser.save();
};

const getUser = async (id) => {
    return await users.findOne({
        email: id,
    })
};

module.exports = {
    registerUser,
    getUser,
}; 