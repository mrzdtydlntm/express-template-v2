const sequelize = require("sequelize");
const { dbKit } = require("../config/env");

module.exports = {
  dialect: dbKit.dialect,
  username: dbKit.username,
  password: dbKit.password,
  port: dbKit.port,
  host: dbKit.host,
  database: dbKit.database,
  database_url: dbKit.databaseURL,
  pool: {
    max: dbKit.poolMax,
    min: dbKit.poolMin,
    acquire: dbKit.poolAcquire,
    idle: dbKit.poolIdle,
  },
  logging: dbKit.queryLogging ? console.info : false,
  retry: {
    match: [/Deadlock/i, sequelize.ConnectionError],
    max: 3,
    backoffBase: 3000,
    backoffExponent: 1.5,
  },
};
