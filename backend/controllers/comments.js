const Comment = require("../models/comments")
const Blog = require("../models/blogs")
const User = require("../models/users")

exports.createComment = async (req, res) => {
  try{
    const {description} = req.body
    const blog = await Blog.findOne({where: {id: req.params.id}})

    if(!description){
      return res.status(400).json({message: "Vous devez au moins saisir une description"})
    }

    if(blog){
      const comment = new Comment({
        description,
        blogId: blog.id,
        userId: req.user
      })

      const lastCreateComment = await comment.save()

      const lastComment = await Comment.findOne({
        where: {id: lastCreateComment.id},
        include: {model: User, attributes: ["name", "firstname"]},
      })

      res.status(201).json(lastComment)

    }else{
      throw Error("Article inexistant")
    }
  }
  catch(err){
    res.status(400).json(err.message)
  }
}

exports.getComment = async (req, res) => {
  try{
    const comments = await Comment.findAll(
      {
        where: {blogId: req.params.id},
        include: [{
          model: User, attributes: ["name", "firstname"],
      }]
    })
    if(!comments){
      throw Error("Aucun commentaires pour cet article existent !")
    }

    res.status(200).json(comments)
  }
  catch(err){
    res.status(400).json(err.message)
  }
}

exports.getOneComment = async (req, res) => {
  try{
    const comment = await Comment.findOne({where: {id: req.params.id}})

    if(!comment){
      throw Error("Ce commentaire n'existe pas !")
    }

    res.status(200).json(comment)
  }
  catch(err){
    res.status(400).json(err.message)
  }
}

exports.updateComment = async (req, res) => {
  try{
    if(!req.body.description){
      throw Error("Vous devez saisir une description")
    }

    await Comment.update({description: req.body.description}, {where: {id: req.params.id}})

    res.status(200).json({message: "Commentaire mis à jour !"})
  }
  catch(err){
    res.status(400).json(err.message)
  }
}

exports.deleteComment = async (req, res) => {
  try{
    const comment = await Comment.destroy({where: {id: req.params.id}})

    if(!comment){
      throw Error("Ce commentaire n'existe pas")
    }

    res.status(200).json({message: "Commentaire supprimé !"})
  }
  catch(err){
    res.status(400).json(err.message)
  }
}