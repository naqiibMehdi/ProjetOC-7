const User = require("../models/Users")

exports.signup = (req, res) => {
 const user = new User({
  ...req.body
 })

 user.save()
 .then(log => console.log(log))
 .catch(err => console.log(err))

}