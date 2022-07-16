const Like = require("../models/likes")
const Blog = require("../models/blogs")
const User = require("../models/users")
const { Op } = require("sequelize")

exports.createLike = async (req, res) => {
  try{ 

    const dataLike = await Like.findOne({where: {[Op.and]: [{blogId: req.params.id}, {userId: req.user}]}})

    if(!dataLike){

      //create like

      const like = await new Like({
        blogId: req.params.id,
        userId: req.user
      })
  
      if(req.params.id && isNaN(req.params.id)){
        throw Error("l'id de l'article doit être un nombre")
      }
  
      await like.save()
      res.status(201).json({message: "Like ajouté !"})

    }else{

      //delete like
      await Like.destroy({
        where: {[Op.and]: [{blogId: req.params.id}, {userId: req.user}]}
      })
      return res.status(200).json({message: "Like supprimé !"}) 
    }      

  }
  catch(err){
    res.status(400).json(err.message)
  }
}

exports.getAllLike = async (req, res) => {
    try{
      const likes = await Like.findAll({where: {blogId: req.params.id}})
      if(!likes){
        throw Error("Aucun likes trouvés !")
      }
      res.status(200).json(likes)

    }
    catch(err){
      res.status(400).json(err.message)
    }
}