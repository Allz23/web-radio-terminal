// Usaremos este archivo para crear funciones utiles para el programa en general.
const controllers = {};
// Requerimos el archivo con la consulta de la base de datos.
const pool = require("../database");

controllers.consultaMySQL = async () => {
 let infoCubetas;
 let filtros = JSON.parse(LocalStorage.getItem("filtros"));
 let selectores = JSON.parse(LocalStorage.getItem("selectores"));
 // Bandera que evita que se consulte mas de una vez la base de datos.
 let consulta = true;

 // Si ya hay un objeto guardado en localStorage, entonces lo usamos, si no, mostramos la busqueda por defecto.
 if (filtros !== null) {
  // CONDICIONES FILTRADAS DE CONSULTAS ------------------------------------------------------
  if (selectores.buscarFecha === "true" && consulta === true) {
   infoCubetas = await pool.query(
    "SELECT u.nombre, u.cedula, c.codigo, c.escaneado_en, s.id_sesion, t.nombre_completo FROM usuarios u INNER JOIN cubetas c  USING (id_usuario) INNER JOIN sesiones s USING (id_sesion) INNER JOIN choferes t USING (id_chofer) WHERE escaneado_en =?",
    [filtros.fecha]
   );
   consulta = false;
  }
  // ----------------------------------------------------------------------------------------------
  if (selectores.buscarSesion === "true" && consulta === true) {
   infoCubetas = await pool.query(
    "SELECT u.nombre, u.cedula, c.codigo, c.escaneado_en, s.id_sesion, t.nombre_completo FROM usuarios u INNER JOIN cubetas c  USING (id_usuario) INNER JOIN sesiones s USING (id_sesion)  INNER JOIN choferes t USING (id_chofer) WHERE id_sesion = ?",
    [filtros.sesion]
   );
   consulta = false;
  }
  // ----------------------------------------------------------------------------------------------
  if (selectores.buscarNombre === "true" && consulta === true) {
   infoCubetas = await pool.query(
    "SELECT u.nombre, u.cedula, c.codigo, c.escaneado_en, s.id_sesion, t.nombre_completo FROM usuarios u INNER JOIN cubetas c  USING (id_usuario) INNER JOIN sesiones s USING (id_sesion) INNER JOIN choferes t USING (id_chofer) WHERE nombre = ?",
    [filtros.nombre]
   );
   consulta = false;
  }
  // ----------------------------------------------------------------------------------------------
 } else {
  infoCubetas = await pool.query(
   "SELECT u.nombre, u.cedula, c.codigo, c.escaneado_en, s.id_sesion, t.nombre_completo FROM usuarios u INNER JOIN cubetas c  USING (id_usuario) INNER JOIN sesiones s USING (id_sesion) INNER JOIN choferes t USING (id_chofer) WHERE id_sesion = 1"
  );
 }

 return infoCubetas;
};

controllers.aggChofer = async schema => {};
// --------------------------------------------------------------------------------------------
module.exports = controllers;
