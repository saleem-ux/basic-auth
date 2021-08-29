'use strict';


// Create a Sequelize model
const Users = (sequelize, DataTypes) =>
  sequelize.define("new_users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

module.exports = Users;

