const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const userRouter = require('./router/user.router');
const topicRouter = require('./router/topic.router');
const postRouter = require('./router/post.router');
const reviewRouter = require('./router/review.router');

const url = process.env.MONGO_URL;

const app = express();
const server = http.createServer(app);

mongoose.connect(url);

app.use(express.json());

app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const validUser = jwt.verify(req.headers.authorization.split(' ')[1], 'secret');

        if(validUser)
            req.user = validUser;
        else
            req.user = undefined;
    } else
        req.user = undefined;
    
    next();
});

app.use(userRouter);
app.use(topicRouter);
app.use(postRouter);
app.use(reviewRouter);

server.listen(3000, () => {
    console.log(3000)
});