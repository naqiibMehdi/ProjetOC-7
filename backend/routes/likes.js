const express = require("express")
const route = express.Router()
const auth = require("../middleware/auth")
const ctrlLike = require("../controllers/likes")

route.post("/blogs/:id/like", auth, ctrlLike.createLike)
route.get("/blogs/:id/like", auth, ctrlLike.getAllLike)

module.exports = route