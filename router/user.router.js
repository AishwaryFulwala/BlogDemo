const userModel = require('../models/user.model')

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userRouter = express.Router();

const register = async (req, res) => {
    const user = req.body

    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    if(!user.email.match(email)){
        return res.status(412).json({
            error: 'Invalid Email Address.'
        });
    }

    // const pwd = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?~_+-=|\]).{8,12}$/;
    // if(!user.password.match(pwd)) {
    //     return res.status(412).json({
    //         error: 'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters.'
    //     });
    // }

    const check = await userModel.getUser(user.email);

    if(check) {
        return res.status(409).json({
            error: 'User is already exists.'
        });        
    }

    bcrypt.hash(user.password, 10, async (err, hash) => {
        if (err) {
            return res.status(400).json({
                error: 'Invalid Data.'
            });
        }
            
        user.password = hash;
        
        return res.status(200).json(await userModel.registerUser(user));
    });
};

const signin = async (req, res) => {
    const user = req.body;

    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    if(!user.email.match(email)){
        return res.status(409).json({
            error: 'Invalid Email Address.'
        });
    }
    
    const check = await userModel.getUser(user.email);
 
    if(!check) {
        return res.status(403).json({
            error: 'Invalid Email Address.'
        });        
    }

    const match = await bcrypt.compare(user.password, check.password)
    if(!match) {
        return res.status(403).json({
            error: 'Invalid Password.'
        });        
    }

    const token = jwt.sign({
        email: check.email,
        _id: check._id,
    }, 'secret');

    return res.status(200).json({
        token,
        success: 'Sign In Successfully'
    });
};

userRouter.post('/register', register);
userRouter.post('/signin', signin);

module.exports = userRouter;