const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
  try{
    const token = req.body.token || req.cookies.jwt
    let decodedToken = {}
    if(!token){
      return res.status(401).json({message: "Vous devez générer un token !"})
    }

    jwt.verify(token, process.env.KEY, (err, data) => {
      if(err){
        throw Error("Signature invalide, échec de la vérification, accèd aux données interdit")
      }else{
        decodedToken = data
      }
    })


    if(req.body.userId && req.body.userId !== decodedToken.id){
      return res.status(403).json({message: "token incorrecte, vous n'êtes pas autorisé"})
    }
    
    req.user = decodedToken.id
    next()
  }
  catch(err){
    res.status(403).json(err.message)
  }
}