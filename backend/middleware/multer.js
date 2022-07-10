const multer = require("multer")
const uuid = require("uuid").v4()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    const nameFile = file.originalname.split(".")[0].split(" ").join("-")
    const extension = file.mimetype.split("/")[1]
    cb(null, nameFile + "-" + uuid + "." + extension)
  }
})

module.exports = multer({storage}).single("imageUrl")