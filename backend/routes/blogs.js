const express = require("express")
const route = express.Router()
const blogCtrl = require("../controllers/blogs")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")


route.post("/blogs", auth, multer, blogCtrl.createBlog)
route.get("/blogs", auth, blogCtrl.getAllBlogs)
route.get("/blogs/:id", auth, blogCtrl.getOneBlog)
route.put("/blogs/:id", auth, multer, blogCtrl.updateOneBlog)
route.delete("/blogs/:id", auth, multer, blogCtrl.deleteOneBlog)


module.exports = route