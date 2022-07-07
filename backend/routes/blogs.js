const express = require("express")
const route = express.Router()
const blogCtrl = require("../controllers/blogs")


route.post("/blogs", blogCtrl.createBlog)

module.exports = route