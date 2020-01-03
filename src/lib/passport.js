// En este archivo colocaremos nuestros metodos de autenticacion
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
// Importamos el objeto necesario para consultar algo a la base de datos
const pool = require("../database");

//Estrategia para validar el inicio de sesion del usuario en el radio terminal
passport.use(
 "local.login-rt",
 new localStrategy(
  {
   // Passport.js buscara en el req.body los siguientes parametros, deben especificarse, o dará un error 'Missing credentials'.
   usernameField: "cedula",
   passwordField: "cedula"
  },
  async (req, cedula, done) => {
   const rows = await pool.query(
    "SELECT id_usuario, nombre FROM usuarios WHERE cedula = ?",
    [cedula]
   );

   if (rows.length > 0) {
    const usuario = rows[0];
    // Dado que el usuario inicio una sesion, procedemos a almacenar una nueva sesion
    const sesionIniciada = {
     comentario: "Sesion",
     id_usuario: usuario.id_usuario
    };
    await pool.query("INSERT INTO sesiones SET ? ", [sesionIniciada]);
    // Dado que el numero de la sesion actual será usado a lo largo del programa, lo almacenamos en la memoria local del navegador. De esta manera realizamos esta consulta solo una vez.
    const sesion = await pool.query(
     "SELECT id_sesion FROM sesiones ORDER BY id_sesion DESC LIMIT 1"
    );
    const sesionActual = sesion[0];
    LocalStorage.setItem("sesionActual", JSON.stringify(sesionActual));

    if (typeof usuario === "object") {
     return done(null, usuario);
    }
   } else {
    return done(null, false, {
     message: "Usuario no encontrado."
    });
   }
  }
 )
);

//Estrategia para validar el inicio de sesion del usuario en el PC
passport.use(
 "local.login",
 new localStrategy(
  {
   // Passport.js buscara en el req.body los siguientes parametros, deben especificarse, o dará un error 'Missing credentials'.
   usernameField: "nombre",
   passwordField: "nombre"
  },
  async (req, nombre, done) => {
   const rows = await pool.query("SELECT * FROM usuarios WHERE cedula = ?", [
    nombre
   ]);
   if (rows.length > 0) {
    const usuario = rows[0];
    if (typeof usuario === "object") {
     return done(null, usuario);
    }
   } else {
    return done(null, false, {
     message: "Usuario no encontrado."
    });
   }
  }
 )
);

// Ahora, la sesion de el usaurio debe quedar almacenada en alguna parte, por ende, usamos otro metodo de passport.js
passport.serializeUser((usuario, done) => {
 done(null, usuario.id_usuario);
});
// // Aplicamos el proceso inverso
passport.deserializeUser(async (id, done) => {
 const rows = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [
  id
 ]);
 done(null, rows[0]);
});
