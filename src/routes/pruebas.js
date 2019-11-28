// Rutas que no tienen nada que ver con la app principal, se usaran para probar caracteristicas generales, o layouts de otros proyectos, aprovehcando que este ya tiene los paquetes instalados.
const { Router } = require("express");
const router = Router();

const pool = require("../database");
const controllers = require("../lib/controllers");

// Ruta para renderizar una tabla mySQL en la vista
router.get("/tables", async (req, res) => {
  // Declaramos las variables que usaremos en la ruta
  let infoCubetas;

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
  let stringFecha = dia + "-" + mes + "-" + año;

  // Prueba: Consultaremos la tabla 'usuarios' y traeremos la columna 'cedula' y con eso probaremos el llenado del selector correspondiente en la vista. COLOCAR DONDE LA CONSULTA SE EJECUTE SOLO UNA VEZ.
  let usuarios = await pool.query("SELECT nombre FROM usuarios");

  controllers.consultaMySQL();
  console.log(infoCubetas);
  res.render("body layouts/tables", {
    infoCubetas,
    usuarios
  });
});

// Ruta a donde se envian los datos recogidos de los formularios
router.post("/parsing", async (req, res) => {
  let checkBoxFecha = req.body.fechaCheck;
  let checkBoxSesion = req.body.sesionCheck;
  let checkBoxNombre = req.body.nombreCheck;
  // console.log(checkBox);

  let stringFecha = req.body.Año + "-" + req.body.Mes + "-" + req.body.Dia;
  // Los selectores nos indican que filtros se van a aplicar.
  let selectores = {
    buscarFecha: req.body.fechaCheck,
    buscarSesion: req.body.sesionCheck,
    buscarNombre: req.body.nombreCheck
  };
  // Valores actuales de los filtros en el formulario
  let filtros = {
    nombre: req.body.Nombre,
    fecha: stringFecha,
    sesion: req.body.Sesion
  };
  // Para poder manejar estos datos en otra ruta, guardamos dichos datos en la memoria del navegador
  LocalStorage.setItem("filtros", JSON.stringify(filtros));
  LocalStorage.setItem("selectores", JSON.stringify(selectores));

  //   Ya teniendo toda la informacion de los filtros, pasamos esa data a la vista que hace la consulta
  res.redirect("/tables");
});

// --------------------------------------------------------------------------------------------
module.exports = router;
