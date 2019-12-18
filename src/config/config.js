// Archivo para almacenar las variables de entorno
const dotenv = require("dotenv");
let result = dotenv.config();

if (result.error) {
 throw result.error;
}

module.exports = {
 mySQLHost: process.env.mysql_host,
 mySQLUser: process.env.mysql_user,
 mySQLPassword: process.env.mysql_password,
 mySQLDB: process.env.mysql_db
};
