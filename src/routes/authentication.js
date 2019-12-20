// Lo que hacemos aqui es pedir solo un modulo de express, de nombre Router y como esto nos devuelve un objeto, lo guardamos en 'router'. Este enrutador (router) nos ayudara a pasarle las rutas al archivo index.js principal.
const { Router } = require("express");
const {
 reglasValidacionOperario,
 reglasValidacionOperarioPC,
 reglasValidacionChofer,
 validar,
 validarPC,
 validarChofer
} = require("../lib/validator");
const router = Router();
const passport = require("passport");
const controllers = require("../lib/controllers");
// Si vamos a usar metodos que requieran una conexion con la base de datos, necsitamos inportar el modulo
const pool = require("../database");

// Rutas que usaran los usuarios para autenticarse y poder iniciar sesion en el radio terminal
router.post(
 "/login-rt",
 reglasValidacionOperario(),
 validar,
 async (req, res, next) => {
  passport.authenticate("local.login-rt", {
   successRedirect: "/transport",
   failureRedirect: "/",
   failureFlash: true
  })(req, res, next);
 }
);

// Rutas que usaran los usuarios para enviar la informacion del chofer actual
router.post(
 "/chofer",
 reglasValidacionChofer(),
 validarChofer,
 async (req, res, next) => {
  let cedulaChofer = req.body.cedulaC;
  const dataChofer = await pool.query(
   "SELECT id_chofer, cedula FROM choferes WHERE cedula =?",
   [cedulaChofer]
  );
  if (dataChofer.length > 0) {
   const chofer = dataChofer[0];
   LocalStorage.setItem("choferActual", JSON.stringify(chofer));
   return res.redirect("/user");
  } else {
   req.flash("error", "Transportista no existe en la base de datos");
   return res.redirect("/transport");
  }
 }
);

// Ruta para añadir el codigo escaneado a la base de datos
router.post("/agregar", async (req, res, next) => {
 // Haremos la prueba de obtener la fecha actual y ver si podemos almacenar ese dato en la base de datos.
 // Primero creamos un objeto con la fecha.
 let dateObject = new Date();
 // Ahora, usamos los metodos de dicho objeto para obtener solo la fecha
 let dia = ("0" + dateObject.getDate()).slice(-2);
 let mes = dateObject.getMonth() + 1;
 // Dado que los meses son retornados en formato 0-11, si el mes tiene menos de dos digitos, se le añade el '0'
 if (mes.length < 2) {
  mes = ("0" + dateObject.getMonth() + 1).slice(-2);
 }
 let año = dateObject.getFullYear();
 // Comprobamos que sea el formato correcto
 let stringFecha = año + "-" + mes + "-" + dia;

 const { codigo } = req.body;
 // Buscamos el valor de la sesion actual en el almacenamiento del navegador.
 const sesionActual = JSON.parse(LocalStorage.getItem("sesionActual"));
 const choferActual = JSON.parse(LocalStorage.getItem("choferActual"));
 // Esquema de la nueva fila en la tabla.
 let nuevoCodigo = {
  codigo,
  id_usuario: req.user.id_usuario,
  id_sesion: sesionActual.id_sesion,
  id_chofer: choferActual.id_chofer,
  escaneado_en: stringFecha
 };
 //   Verificamos que el codigo no haya sido guardado ya en esta sesion, y, si es asi, lo guardamos.
 const existeCodigo = await pool.query(
  "SELECT codigo, id_sesion FROM cubetas WHERE codigo =? AND id_sesion=?",
  [codigo, sesionActual.id_sesion]
 );
 // Si el arreglo devuelto no esta vacio, se encontro algo en la base de datos.
 if (existeCodigo.length > 0) {
  req.flash("error_msg", "Codigo ya escaneado en ésta sesion.");
  return res.redirect("/user");
 } else {
  req.flash("success_msg", "Codigo añadido satisfactoriamente.");
  await pool.query("INSERT INTO cubetas SET ? ", nuevoCodigo);
  res.redirect("/user");
 }
});

// Rutas que usaran los usuarios para utenticarse y poder iniciar sesion en la PC
router.post(
 "/login",
 reglasValidacionOperarioPC(),
 validarPC,
 async (req, res, next) => {
  passport.authenticate("local.login", {
   successRedirect: "/main",
   failureRedirect: "/login",
   failureFlash: true
  })(req, res, next);
 }
);

router.post("/aggchofer", async (req, res) => {
 let choferSchema = {
  codigo_nomina: req.body.nomina_chofer,
  codigo_sap: req.body.sap_chofer,
  cedula: req.body.cedula_chofer,
  nombre_completo: req.body.nombreC_chofer
 };

 const consultaChofer = await pool.query(
  " SELECT cedula FROM choferes WHERE cedula = ?",
  [choferSchema.cedula]
 );
 if (consultaChofer.length > 0) {
  req.flash("error_msg", "Transportista ya existe en la base de datos");
  return res.redirect("/main");
 } else {
  await pool.query("INSERT INTO choferes SET ?", [choferSchema]);
  req.flash("success_msg", "Usuario agregado exitosamente.");
  return res.redirect("/main");
 }
});

// Ruta para agregar un usuario a la base de datos
router.post("/agguser", async (req, res) => {
 let userSchema = {
  nombre: req.body.nombreU,
  cedula: req.body.cedulaU,
  admin: req.body.admin
 };
 if (userSchema.admin === undefined) {
  userSchema.admin = "0";
 }
 const usuario = await pool.query(
  "SELECT cedula FROM usuarios WHERE cedula = ?",
  [userSchema.cedula]
 );
 if (usuario.length > 0) {
  req.flash("error_msg", "Usuario ya existe en la base de datos.");
  return res.redirect("/main");
 } else {
  req.flash("success_msg", "Usuario agregado exitosamente.");
  await pool.query("INSERT INTO usuarios SET ?", [userSchema]);
  return res.redirect("/main");
 }
});

// ------------------------------------------------------------------------------------------
module.exports = router;
