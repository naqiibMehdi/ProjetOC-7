const User = require("../models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signup = (req, res) => {
  const {name, firstname, email, password, isadmin} = req.body
  let listErrors = {}

    bcrypt.hash(password, 10)
    .then((hashPassword) => {
      const user = new User({
        name,
        firstname,
        email,
        password: hashPassword,
        isadmin
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
  
    const user = await User.findOne({where: {email: req.body.email}})
    
    if(!user){
      return res.status(400).json({message: "Cet email n'existe pas"})
    }

    const decryptPassword = await bcrypt.compare(req.body.password, user.password)

    if(!decryptPassword){
      return res.status(400).json({message: "mot de passe incorrecte"})
    }

    res.status(200).json({
      id: user.id,
      isadmin: user.isadmin,
      token: jwt.sign({id: user.id}, process.env.KEY, {expiresIn: "24h"})

    })

}