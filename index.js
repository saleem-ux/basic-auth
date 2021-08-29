'use strict';

require('dotenv').config('./src/server');

const server = require('./src/server');
const { db } = require('./src/models/index');

db.sync()
  .then(() => {
    server.start(process.env.PORT || 8080);
  })
  .catch(console.error);