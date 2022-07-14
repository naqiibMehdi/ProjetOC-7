const express = require("express")
const route = express.Router()
const commentCtrl = require("../controllers/comments")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")


route.post("/blogs/:id/comment", auth, multer, commentCtrl.createComment)
route.get("/blogs/:id/comment", auth, multer, commentCtrl.getComment)

module.exports = route