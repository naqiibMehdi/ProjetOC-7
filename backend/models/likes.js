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

Blog.belongsToMany(User, {through: Like, foreignKey: "blogId"})
User.belongsToMany(Blog, {through: Like, foreignKey: "userId"})


module.exports = Like