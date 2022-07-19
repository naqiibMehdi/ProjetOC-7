const User = require("../models/users")
const Comment = require("../models/comments")
require("dotenv").config()

module.exports = async (req, res, next) => {
  try{

    const user = await User.findOne({where: {id: req.user}})

    const comment = await Comment.findOne({where: {id: req.params.id}})

    if(user.isadmin === true || user.id === comment.userId){
      next()
    }else{

      throw new Error("modification/suppression impossible, vous n'êtes pas autorisé à modifier/supprimer cet article")
    }

  }
  catch(err){
    res.status(403).json(err.message)
  }
}