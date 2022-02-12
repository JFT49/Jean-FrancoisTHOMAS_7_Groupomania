require('dotenv').config(); 

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: process.env.MYSQL_ROOT_PASS,
    DB: "projet7",
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