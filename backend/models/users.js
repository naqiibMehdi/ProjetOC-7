const sequelize = require("../db.config")
const {Sequelize, OP, DataTypes} = require("sequelize")

const test = sequelize.define("tests", {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = test