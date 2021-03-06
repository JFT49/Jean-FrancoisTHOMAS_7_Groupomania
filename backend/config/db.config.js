require('dotenv').config()    //DOTENV : pour le gestion des variables d'environneemnts

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: process.env.MYSQL_ROOT_PASS,
    DB: "groupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    timezone: '+01:00'
}