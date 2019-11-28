const moment = require("moment");
// Creamos una libreria de helpers para añadir funciones especificas a Handlebars.
const helpers = {};
// Requerimos el archivo con la consulta de la base de datos.
const pool = require("../database");

helpers.formatoFecha = escaneado_en => {
  console.log(escaneado_en);
  return moment(escaneado_en).format("DD-MM-YYYY");
};

module.exports = helpers;
