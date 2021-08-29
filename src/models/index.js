'use strict';

require('dotenv').config('./src/server');

const POSTGRES_URI = process.env.POSTGRES_URI || 'postgres://localhost/authentication';

const { Sequelize, DataTypes } = require('sequelize');

const user = require('./user-model');

let sequelize = new Sequelize(POSTGRES_URI, {});


module.exports = {
    db: sequelize,
    Users: user(sequelize, DataTypes),
};