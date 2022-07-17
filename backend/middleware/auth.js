const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
  const token = req.body.token || req.cookies.jwt
  if(!token){
    return res.status(401).json({message: "Vous devez générer un token !"})
  }

  const decodedToken = jwt.verify(token, process.env.KEY)

  if(req.body.userId && req.body.userId !== decodedToken.id){
    return res.status(403).json({message: "token incorrecte, vous n'êtes pas autorisé"})
  }
  
  req.user = decodedToken.id
  next()
}