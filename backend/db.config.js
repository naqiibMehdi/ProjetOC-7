const { Sequelize} = require("sequelize");
const dotenv = require("dotenv")

dotenv.config()

const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASSWORD, {
  host: process.env.DBHOST,
  dialect: 'mariadb',
  timezone: "+02:00"
});


module.exports = sequelize