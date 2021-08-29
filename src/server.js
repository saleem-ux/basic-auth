'use strict';

const express = require('express');
const app = express();
const notFounderHandler = require('./error-handler/404');
const errorHandler = require('./error-handler/500');
const userAuth = require('./auth/routes/router');

app.use(express.json());
app.use(userAuth);

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.get('/bad', (req, res, next) => {
    next('Bad End Point');
});

app.use('*', notFounderHandler);
app.use(errorHandler);

module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => console.log(`Listen on port ${port}`));
    },
};