const sequelize = require("../db.config")
const {DataTypes} = require("sequelize")

const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isadmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

module.exports = User