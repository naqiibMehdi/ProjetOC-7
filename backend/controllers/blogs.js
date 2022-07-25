const Blog = require("../models/blogs")
const User = require("../models/users")
const fs = require("fs")

//create one blog
exports.createBlog = async (req, res) => {

  try {
    const { description, imageUrl, userId } = req.body
    let blog

    if (!req.body.description) {
      throw Error("vous devez au moins saisir une description !")
    }

      if(req.file){
        blog = new Blog({
          description,
          userId: req.user,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        })
      }else{
        blog = new Blog({
          description,
          userId: req.user,
        })
      }
   
    await blog.save()
    res.status(201).json({ message: "Blog créé avec succès !" })

  }
  catch (err) {
    res.status(400).json(err.message)
  }

}


//display all blogs
exports.getAllBlogs = async (req, res) => {
  try{
    const allBlogs = await Blog.findAll({
      include: {model: User, attributes: ["name", "firstname", "imageProfile"]},
      order: [["createdAt", "desc"]]
    })
    
    if(!allBlogs){
      throw Error("aucun blogs disponible")
    }
    
    res.status(200).json(allBlogs)
  }
  
  catch(err){
    res.status(400).json(err.message)
  }
}

//get one blog only
exports.getOneBlog = async (req, res) => {
  try{
    const oneBlog = await Blog.findOne({where: {id: req.params.id}, 
      include: {model: User, attributes: ["name", "firstname", "imageProfile"]}
    })
    if(!oneBlog){
      throw Error("article inexistant")
    }
    res.status(200).json(oneBlog)
  }
  catch(err){
    res.status(400).json(err.message)
  }
}

exports.updateOneBlog = async (req, res) => {
  try{
      if(!req.file){

        await Blog.update({description: req.body.description}, {where: {id: req.params.id}})
        res.status(200).json({message: "Description du blog mis à jour !"})

      }else{

        const blog = await Blog.findOne({where: {id: req.params.id}})
        const file = blog.imageUrl.split("/images/")[1]

        fs.unlink(`images/${file}`, async () => {
          await Blog.update({
            ...req.body,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          }, {where: {id: blog.id}})

          res.status(200).json({message: "description et image mis à jour !"})
        })

      }
    }
  catch(err){
      res.status(400).json(err.message)
    }
}

exports.deleteOneBlog = async (req, res) => {
  try{
    const blog = await Blog.findOne({where: {id: req.params.id}})

    if(blog){

      const file = blog.imageUrl.split("/images/")[1]

      fs.unlink(`images/${file}`, async () => {

        await Blog.destroy({where: {id: blog.id}})
        res.status(200).json({message: "Blog supprimé !"})

      })
    }else{
      throw Error("ce blog n'existe plus !")
    }
  }
  catch(err){
    res.status(400).json(err.message)
  }
}