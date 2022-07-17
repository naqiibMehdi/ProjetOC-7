const sequelize = require("../db.config")
const {DataTypes} = require("sequelize")

const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z]{3,}$/,
        msg: "Donnée incorrecte, veuillez saisir un nom valide"
      }
    }
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z]{3,}$/,
        msg: "Donnée incorrecte, veuillez saisir un prénom valide"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail:{
        args: true,
        msg: "Donnée incorrecte, veuillez saisir un email valide"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "Le mot de passe ne peut pas être vide"
      }
    }
  },
  imageProfile: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isadmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

module.exports = User