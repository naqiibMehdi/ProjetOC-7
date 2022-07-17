const express = require("express")
const route = express.Router()
const blogCtrl = require("../controllers/blogs")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")
const ownerBlog = require("../middleware/ownerBlog")


route.post("/blogs", auth, multer, blogCtrl.createBlog)
route.get("/blogs", auth, blogCtrl.getAllBlogs)
route.get("/blogs/:id", auth, blogCtrl.getOneBlog)
route.put("/blogs/:id", auth, ownerBlog, multer, blogCtrl.updateOneBlog)
route.delete("/blogs/:id", auth, ownerBlog, blogCtrl.deleteOneBlog)


module.exports = route