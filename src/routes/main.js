// Lo que hacemos aqui es pedir solo un modulo de express, de nombre Router y como esto nos devuelve un objeto, lo guardamos en 'router'. Este enrutador (router) nos ayudara a pasarle las rutas al archivo index.js principal.
const { Router } = require("express");
const router = Router();

const pool = require("../database");
const controllers = require("../lib/controllers");
const { isLoggedIn, isLoggedInRT } = require("../lib/auth");
// Ahora, creamos las rutas necesarias para nuestro sitio con manejadores de peticiones.
// Rutas necesarias para la pagina principal --------------------------------------------------
router.get("/", (req, res) => {
 res.render("body layouts/index");
});

// Rutas hacia donde se redirigira el usaurio cuando inicie sesion
router.get("/user", isLoggedInRT, async (req, res) => {
 // Buscamos el valor de la sesion actual en el almacenamiento del navegador.
 const choferActual = JSON.parse(LocalStorage.getItem("choferActual"));
 const sesionActual = JSON.parse(LocalStorage.getItem("sesionActual"));
 const numeroSesion = sesionActual.id_sesion;
 const cedulaChofer = choferActual.cedula;
 res.render("body layouts/user", {
  numeroSesion,
  cedulaChofer
 });
});

// Rutas hacia que visitara el usaurio para agregar el transportista actual.
router.get("/transport", isLoggedInRT, async (req, res) => {
 res.render("body layouts/chofer", {
  layout: "main"
 });
});

// Ruta que usará el usuario para cerrar la sesion en el radio terminal
router.get("/logout-rt", (req, res) => {
 req.logOut();
 res.redirect("/");
});

// Ruta que usará el usuario para iniciar sesion en la PC
router.get("/login", (req, res) => {
 res.render("body layouts/PC/login", {
  layout: "pc-login"
 });
});

// Ruta que usará el usuario para cerrar la sesion en la PC
router.get("/logout", async (req, res) => {
 await req.logOut();
 console.log(req.user);
 return res.redirect("/login");
});

// Página inicial en version PC
router.get("/main", isLoggedIn, async (req, res) => {
 // Declaramos las variables qu e usaremos en la ruta
 let infoCubetas;
 // Creamos un objeto fecha, con el cual pasaremos el valor de la fehca actual al 'input'
 let objetoFecha = new Date();

 let dia = ("0" + objetoFecha.getDate()).slice(-2);
 let mes = ("0" + (objetoFecha.getMonth() + 1)).slice(-2);
 let año = objetoFecha.getFullYear();
 let inputFecha = año + "-" + mes + "-" + dia;
 // Prueba: Consultaremos la tabla 'usuarios' y traeremos la columna 'cedula' y con eso probaremos el llenado del selector correspondiente en la vista. COLOCAR DONDE LA CONSULTA SE EJECUTE SOLO UNA VEZ.
 let usuarios = await pool.query("SELECT nombre FROM usuarios");

 res.render("body layouts/PC/index", {
  layout: "pc",
  usuarios,
  inputFecha
 });
});

router.get("/tables", isLoggedIn, async (req, res) => {
 // Declaramos las variables que usaremos en la ruta
 let infoCubetas;
 // Creamos un objeto fecha, con el cual pasaremos el valor de la fehca actual al 'input'
 let objetoFecha = new Date();

 let dia = ("0" + objetoFecha.getDate()).slice(-2);
 let mes = ("0" + (objetoFecha.getMonth() + 1)).slice(-2);
 let año = objetoFecha.getFullYear();
 let inputFecha = año + "-" + mes + "-" + dia;
 // Prueba: Consultaremos la tabla 'usuarios' y traeremos la columna 'cedula' y con eso probaremos el llenado del selector correspondiente en la vista. COLOCAR DONDE LA CONSULTA SE EJECUTE SOLO UNA VEZ.
 let usuarios = await pool.query("SELECT nombre FROM usuarios");

 infoCubetas = await controllers.consultaMySQL();

 res.render("body layouts/PC/tables", {
  layout: "pc",
  infoCubetas,
  usuarios,
  inputFecha
 });
});

// Ruta a donde se envian los datos recogidos de los formularios
router.post("/parsing", async (req, res) => {
 let checkBoxFecha = req.body.fechaCheck;
 let checkBoxSesion = req.body.sesionCheck;
 let checkBoxNombre = req.body.nombreCheck;

 // let stringFecha = req.body.Año + "-" + req.body.Mes + "-" + req.body.Dia;
 // Los selectores nos indican que filtros se van a aplicar.
 let selectores = {
  buscarFecha: req.body.fechaCheck,
  buscarSesion: req.body.sesionCheck,
  buscarNombre: req.body.nombreCheck
 };
 // Valores actuales de los filtros en el formulario
 let filtros = {
  nombre: req.body.Nombre,
  sesion: req.body.Sesion,
  fecha: req.body.datePicker
 };

 // Para poder manejar estos datos en otra ruta, guardamos dichos datos en la memoria del navegador
 LocalStorage.setItem("filtros", JSON.stringify(filtros));
 LocalStorage.setItem("selectores", JSON.stringify(selectores));
 //   Ya teniendo toda la informacion de los filtros, pasamos esa data a la vista que hace la consulta
 res.redirect("/tables");
});

// Ruta visitada cuando se desee ver la lista de usuarios registrados
router.get("/users", isLoggedIn, async (req, res) => {
 // Declaramos las variables que usaremos en la ruta
 let usuarios = await pool.query(
  "SELECT id_usuario, nombre, cedula, admin FROM usuarios"
 );

 res.render("body layouts/PC/users", {
  layout: "pc",
  usuarios
 });
});

// Ruta creada para eliminar un usuario de la base de datos
router.get("/delete/:id", async (req, res) => {
 const { id } = req.params;
 await pool.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
 req.flash("success_msg", "Usuario eliminado satisfactoriamente.");
 res.redirect("/users");
});
// --------------------------------------------------------------------------------------------
module.exports = router;
