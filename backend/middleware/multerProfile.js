const multer = require("multer")
const uuid = require("uuid").v4()

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'images/profile')
  },
  filename: function (req, file, cb) {
    const nameFile = file.originalname.split(".")[0].split(" ").join("-")
    const extension = file.mimetype.split("/")[1]
    cb(null, nameFile + "-" + uuid + "." + extension)
  }
})

module.exports = multer({
  storage,
  limits: 1 * (1024 * 1024),
  fileFilter: function (req, file, cb) {
    const whitelist = ['image/png', 'image/jpeg', 'image/jpg']
    if(!whitelist.includes(file.mimetype)){
      return cb(new Error("Seules les extensions suivantes sont acceptées: png | jpeg"))
    }
    cb(null, true)
  }
}).single("imageProfile")