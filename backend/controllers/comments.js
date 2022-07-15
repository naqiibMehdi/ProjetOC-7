const Comment = require("../models/comments")
const Blog = require("../models/blogs")
const User = require("../models/users")

exports.createComment = async (req, res) => {
  try{
    const {description} = req.body
    const blog = await Blog.findOne({where: {id: req.params.id}})

    if(blog){
      const comment = new Comment({
        description,
        blogId: blog.id,
        userId: req.user
      })

      await comment.save()
      res.status(201).json({message: "Commentaire ajouté !"})
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