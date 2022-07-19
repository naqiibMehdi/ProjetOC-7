const express = require("express")
const route = express.Router()
const userCtrl = require("../controllers/users")
const auth = require("../middleware/auth")
const multerProfile = require("../middleware/multerProfile")


route.post("/signup", userCtrl.signup)
route.post("/login", userCtrl.login)

//section of user path
route.put("/user/profile/image", auth, multerProfile, userCtrl.updateImageUser)
route.get("/user/profile", auth, userCtrl.getOneUser)
route.delete("/user/profile", auth, userCtrl.deleteOneUser)

//section of admin path
route.get("/admin", userCtrl.getAllUsers)

module.exports = route