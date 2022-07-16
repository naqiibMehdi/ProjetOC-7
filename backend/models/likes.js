const sequelize = require("../db.config")
const {DataTypes} = require("sequelize")
const Blog = require("./blogs")
const User = require("./users")

const Like = sequelize.define("likes", {
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
})

Blog.hasMany(Like, {foreignKey: "blogId"})
User.hasMany(Like, {foreignKey: "userId"})

Like.belongsTo(Blog)
Like.belongsTo(User)

module.exports = Like