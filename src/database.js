// En este archivo crearemos la conexion a la base de datos
const mySQL = require("mysql");
const { database } = require("./config/keys");
const { promisify } = require("util");

// usamos el metodo .getPool() dado que es el mas parecido a un entorno de produccion.
const pool = mySQL.createPool(database);

pool.getConnection((err, connection) => {
 if (err) {
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
   console.error("La conexion a la base de datos se cerro.");
  }
  if (err.code === "ER_CON_COUNT_ERROR") {
   console.error("La base de datos tiene muchas conexiones.");
  }

  if (err.code === "ECONNREFUSED") {
   console.error("La conexion con la bse de datos fue rechazada.");
  }
 }

 if (connection) connection.release();
 console.log("mySQL Database is connected.");
 return;
});
// Usamos el modulo promisify para convertir los callbacks que retorne el metodo en promesas.
pool.query = promisify(pool.query);
// ----------------------------------
module.exports = pool;
