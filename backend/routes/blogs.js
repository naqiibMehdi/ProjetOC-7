const express = require("express")
const route = express.Router()
const blogCtrl = require("../controllers/blogs")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")


route.post("/blogs", auth, multer, blogCtrl.createBlog)
route.get("/blogs", auth, blogCtrl.getAllBlogs)

module.exports = route