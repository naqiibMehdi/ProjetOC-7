const sequelize = require("../db.config")
const {DataTypes} = require("sequelize")
const Blog = require("./blogs")
const User = require("./users")

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

Blog.hasMany(Comment, {foreignKey: "blogId"})
User.hasMany(Comment, {foreignKey: "userId"})

Comment.belongsTo(Blog)
Comment.belongsTo(User)

module.exports = Comment