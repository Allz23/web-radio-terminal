const {
 mySQLHost,
 mySQLPassword,
 mySQLUser,
 mySQLDB
} = require("../config/config");

module.exports = {
 database: {
  host: mySQLHost,
  user: mySQLUser,
  password: mySQLPassword,
  database: mySQLDB,
  insecureAuth: true
 }
};
