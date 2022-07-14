const sequelize = require("../db.config")
const {DataTypes} = require("sequelize")
const Blog = require("./blogs")

const Comment = sequelize.define("comments", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Blog.hasMany(Comment)

Comment.belongsTo(Blog)

module.exports = Comment