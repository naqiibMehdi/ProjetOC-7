const express = require("express")
const route = express.Router()
const commentCtrl = require("../controllers/comments")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")


route.post("/blogs/:id/comment", auth, commentCtrl.createComment)
route.get("/blogs/:id/comment", auth, commentCtrl.getComment)
route.put("/comment/:id", auth, commentCtrl.updateComment)
route.delete("/comment/:id", auth, commentCtrl.deleteComment)
route.get("/comment/:id", auth, commentCtrl.getOneComment)

module.exports = route