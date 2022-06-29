const User = require("../models/Users")
const bcrypt = require("bcrypt")

exports.signup = (req, res) => {
  const {name, firstname, email, password, isadmin} = req.body

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
        .catch((err) => res.status(400).json(err.errors))
    })
    .catch(err => res.status(400).json({err}))
     
}