const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  dialectOptions: {
    dateStrings: dbConfig.dialectOptions.dateStrings,
    typeCast: dbConfig.dialectOptions.typeCast
  },
  timezone: dbConfig.timezone
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require("./Post.model.js")(sequelize, Sequelize);
db.comment = require("./Comment.model.js")(sequelize, Sequelize);
db.user = require("./User.model.js")(sequelize, Sequelize);

module.exports = db;