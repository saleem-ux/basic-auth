'use strict';

const express = require('express');
const cors = require('cors');

const authRoutes = require('./auth/routes.js');

const notFoundError = require('./error-handlers/404')
const errorHandler = require('./error-handlers/500')

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



app.get('/', lifeProof);
app.get('/bad', badHandler);


function lifeProof(req, res) {
    res.status(200).json('Hello World 😎');
}

function badHandler(req, res) {
    throw new Error('some thing went wrong');
}




app.use(authRoutes);
app.use('*', notFoundError)// catch-all 404 handler
app.use(errorHandler)// internal server error handler


// listening function

function start(port) {
    app.listen(port, () => {
        console.log(`listening on ${port}`);
    })
}

// export module for index.js
module.exports = {
    app: app,
    start: start
};