const express = require("express")
const route = express.Router()
const userCtrl = require("../controllers/users")
const auth = require("../middleware/auth")
const multerProfile = require("../middleware/multerProfile")


route.post("/signup", userCtrl.signup)
route.post("/login", userCtrl.login)
route.post("/logout", userCtrl.logout)

//section of user path
route.put("/user/profile/image", auth, multerProfile, userCtrl.updateImageUser)
route.get("/user/profile", auth, userCtrl.getOneUser)
route.delete("/user/profile", userCtrl.deleteOneUser)

//section of admin path
route.get("/admin/user", auth, userCtrl.getAllUsersByAdmin)
route.put("/admin/user/:userId", auth, userCtrl.updateStatusAdmin)
route.delete("/admin/user/:userId", auth, userCtrl.deleteUserByAdmin)

module.exports = route