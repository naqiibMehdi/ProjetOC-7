const sequelize = require("../db.config")
const {DataTypes} = require("sequelize")
const User = require("./users")

const Blog = sequelize.define("blogs", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

User.hasMany(Blog)

Blog.belongsTo(User)

module.exports = Blog