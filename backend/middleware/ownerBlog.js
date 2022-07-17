const jwt  = require("jsonwebtoken")
const User = require("../models/users")
const Blog = require("../models/blogs")
require("dotenv").config()

module.exports = async (req, res, next) => {
  try{

    const user = await User.findOne({where: {id: req.user}})

    const blog = await Blog.findOne({where: {id: req.params.id}})

    if(user.isadmin === true || user.id === blog.userId){
      next()
    }else{

      throw new Error("modification/suppression impossible, vous n'êtes pas autorisé à modifier/supprimer cet article")
    }

  }
  catch(err){
    res.status(403).json(err.message)
  }
}