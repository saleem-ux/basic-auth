"use strict";

require("dotenv");

const UsersModel = require('./users-model');
//Connect to the database
const POSTGRES_URI = process.env.NODE_ENV = "test" ? 'sqlite:memory' : 'postgres://nediexry:slQd3tmsEjtlkMyM2VPtshdwTC7adGmE@chunee.db.elephantsql.com/nediexry';
const { Sequelize, DataTypes } = require('sequelize');

// config for prod
const sequelize = new Sequelize(POSTGRES_URI, {});

module.exports = {
    db: sequelize,
    UsersModel: UsersModel(sequelize, DataTypes),

}