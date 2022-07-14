const express = require("express")
const path = require("path")
const authRoute = require("./routes/users")
const blogsRoute = require("./routes/blogs")
const commentRoute = require("./routes/comments")
const cookieParser = require("cookie-parser")


const app = express()

app.use(cookieParser())
app.use(express.json())



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use("/images", express.static(path.join(__dirname, "images")))


app.use("/api/auth", authRoute)
app.use("/api", blogsRoute, commentRoute)

module.exports = app