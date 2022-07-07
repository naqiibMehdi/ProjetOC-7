const Blog = require("../models/blogs")
const User = require("../models/users")

exports.createBlog = async (req, res) => {

  try {

    const { description, imageUrl } = req.body
    let blog

    if (!req.body.description) {
      return res.status(400).json({ message: "vous devez au moins saisir une description !" })
    }

    if (req.file) {
      blog = new Blog({
        description,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      })
    } else {
      blog = new Blog({ ...req.body })
    }

    await blog.save()
    res.status(201).json({ message: "Blog créé avec succès !" })

  }
  catch (err) {
    res.status(400).json({ err })
  }

}