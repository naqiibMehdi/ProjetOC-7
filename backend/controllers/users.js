const User = require("../models/Users")
const Blog = require("../models/blogs")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const passwordValidator = require("password-validator")
require("dotenv").config()



exports.signup = (req, res) => {
  const schema = new passwordValidator()
  schema
  .is().min(8)
  .is().max(100)
  .has().uppercase(1)
  .has().lowercase(1)
  .has().digits(1)
  .has().not().spaces()

  const {name, firstname, email, password} = req.body
  let listErrors = {}

    if(!schema.validate(password)){
        return res.status(400).json({password: "Critère du Mot de passe: 1 minuscule, 1 majuscule, 1 chiffre, 8 caractères minimum"})
    }
     

    bcrypt.hash(password, 10)
    .then((hashPassword) => {
      const user = new User({
        name,
        firstname,
        email,
        password: hashPassword,
        imageProfile: `${req.protocol}://${req.get("host")}/images/profile/profile.png`,
        isadmin: false
      })
      user.save()
        .then(() => res.status(201).json({ message: "Utilsateur créé !" }))
        .catch((err) => {
          for(let error of err.errors){
            listErrors[error.path] = error.message
          }
          res.status(400).json(listErrors)
        })
    })
    .catch(err => res.status(400).json({err}))
     
}

exports.login = async (req, res) => {
  
  if(!req.body.email || !req.body.password){
    return res.status(400).json({message: "Veuillez remplir tous les champs !"})
  }
    const user = await User.findOne({where: {email: req.body.email}})
    
    if(!user || req.body.email !== user.email){
      return res.status(400).json({message: "Cet utilisateur n'existe pas"})
    }
    
    const decryptPassword = await bcrypt.compare(req.body.password, user.password)
    
    if(!decryptPassword){
      return res.status(400).json({message: "mot de passe incorrecte"})
    }
    
    const token = jwt.sign({id: user.id}, process.env.KEY, {expiresIn: "24h"})

    res.cookie("jwt", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24, SameSite: "None"})
    res.cookie("user", user.id, {maxAge: 1000 * 60 * 60 * 24, SameSite: "None"})

    res.status(200).json({
      idUser: user.id,
      isadmin: user.isadmin
    })
}

exports.logout = (req, res) => {
  res.cookie("jwt", "", {maxAge: 1})
  res.cookie("user", '', {maxAge: 1})
  res.status(200).json("Vous êtes bien déconnecté")
}

//section of function for the user
exports.updateImageUser = async (req, res) => {
  try{
    if(req.file){
      const user = await User.findOne({where: {id: req.user}})
      const file = user.imageProfile.split("/images/profile/")[1]

      if(file === "profile.png"){

        await User.update({
          imageProfile: `${req.protocol}://${req.get("host")}/images/profile/${req.file.filename}`
        }, {where: {id: req.user}})

        res.status(200).json({message: "image du profil mis à jour"})

      }else{

        fs.unlink(`images/profile/${file}`, async () => {
          await User.update({
            imageProfile: `${req.protocol}://${req.get("host")}/images/profile/${req.file.filename}`
          }, {where: {id: req.user}})

          res.status(200).json({message: "image du profil mis à jour"})
        })
      }
    }else{
      throw Error("Aucune image à changer !")
    }
  }
  catch(err){
    res.status(400).json(err.message)
  }
}

exports.getOneUser = async (req, res) => {
  try{
    const user = await User.findOne({where: {id: req.user}, attributes: ["name", "firstname", "isadmin", "imageProfile", "email", "createdat"]})

    if(!user){
      throw Error("Utilisateur introuvable !")
    }

    res.status(200).json(user)
  }
  catch(err){
    res.status(400).json(err.message)
  }
}

exports.deleteOneUser = async (req, res) => {
  try{
    const oneUser = await User.findOne({where: {id: req.user}, attributes: ["imageProfile"]})
    const allBlogs = await Blog.findAll({where: {userId: req.user}, attributes: ["imageUrl"]})


    if(oneUser){
      const imageProfile = oneUser.imageProfile.split("/images/profile/")[1]
      if(imageProfile !== "profile.png"){
        fs.unlinkSync(`images/profile/${imageProfile}`)
      }
    }

    if(allBlogs && allBlogs.length >= 1){
      allBlogs.forEach(image => {
        const imageBlog = image.imageUrl.split("/images/")[1]
        fs.unlinkSync(`images/${imageBlog}`)
      })
    }

    const user = await User.destroy({where: {id: req.user}})

    if(!user){
      throw Error("Utilisateur introuvable !")
    }

    res.cookie("jwt", "", {maxAge: 1})
    res.cookie("user", '' , {maxAge: 1})
    res.status(200).json({message: "Votre compte a bien été supprimé !"})
   }

    catch(err){
    res.status(400).json(err.message)
   }
}

//section of function for the admin

exports.getAllUsersByAdmin = async (req, res) => {
  try{
    const users  = await User.findAll({where: {
      email: {[Op.ne]: "admin@groupomania.com"}
      },
      attributes: ["id", "name", "firstname", "isadmin", "email", "imageProfile"]
    })

    if(!users){
      throw Error("Aucun utilisateur existant !")
    }

    res.status(200).json(users)
  }
  catch(err){
    res.status(400).json(err.message)
  }

}

exports.deleteUserByAdmin = async (req, res) => {

  const oneUser = await User.findOne({where: {id: req.params.userId}, attributes: ["imageProfile"]})
  const allBlogs = await Blog.findAll({where: {userId: req.params.userId}, attributes: ["imageUrl"]})


  if(oneUser){
    const imageProfile = oneUser.imageProfile.split("/images/profile/")[1]
    if(imageProfile !== "profile.png"){
      fs.unlinkSync(`images/profile/${imageProfile}`)
    }
  }

  if(allBlogs && allBlogs.length >= 1){
    allBlogs.forEach(image => {
      const imageBlog = image.imageUrl.split("/images/")[1]
      fs.unlinkSync(`images/${imageBlog}`)
    })
  }

  await User.destroy({where: {id: req.params.userId}})

  res.status(200).json({message: "utilisateur supprimé avec succès !"})
}

exports.updateStatusAdmin = async (req, res) => {
  try{
    const user = await User.findOne({where: {id: req.params.userId}})

    if(!user){
      throw Error("Utilisateur non trouvé")
    }

    if(!user.isadmin){

      await User.update({isadmin: true}, {where: {id: user.id}})
      res.status(200).json({message: "Status utilisateur mis à jour !"})

    }else{

      await User.update({isadmin: false}, {where: {id: user.id}})
      res.status(200).json({message: "Status utilisateur mis à jour !"})
    }
  }
  catch(err){
    res.status(400).json(err.message)
  }
}