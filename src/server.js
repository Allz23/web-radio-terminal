const express = require("express"); // Se usa para poder manejar el servidor de manera mas rapida y profesional.
const path = require("path"); // Este modulo nos ayuda a indicarle al servidor rutas en nuestro ordenador.
const morgan = require("morgan"); // Se usa para ver los mensajes que nos envia el servidor.
const exphbs = require("express-handlebars");
const expSessions = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(expSessions);
const localStorage = require("node-localstorage").LocalStorage;
const bodyParser = require("body-parser");

const { database } = require("./config/keys");
// Initializations: Inicializacion de componentes, variables, modulos, etc.
const app = express();
require("./lib/passport");
LocalStorage = new localStorage("./LocalStorage");

// Settings: Configuraciones necesarias del servidor
// Dirigimos al servidor a la carpeta donde estan los archivos publicos
app.use(express.static(__dirname + "/public/"));

app.set("port", process.env.PORT || 3001); // Si tienes algun puerto, úsalo. Si no, conectate al puerto 3000.
app.set("views", path.join(__dirname, "views"));
// Le decimos a nuestro servidor donde se encuentran las carpetas de las vistas, y que motor de plantillas usara.
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");

app.use(morgan("dev")); // Formato de salida: Respuesta del servidor / tiempo de respuesta - Peso (En bytes)
// Body parser, metodo de express nos ayuda a interpretar desde el servidor los mensajes enviados desde formularios.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configuramos las sesiones de Express.js, asi podemos guardar datos de los usuarios.
app.use(
  expSessions({
    secret: "secretApp",
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore(database)
  })
);
// Para poder agregar un usuario a la sesion, añadimos su configuracion
app.use(passport.initialize());
app.use(passport.session());
// Añadimos el modulo connect-flash para enviar mensajes a traves de multiples vistas. Es decir, una activacion de un servicio en la pagina de 'configuraciones' se puede mostrar en la pagina 'principal'.
app.use(flash());
// Global variables
// Creamos variables globales para los mensajes flash
app.use((req, res, next) => {
  // Estas variables almacenan el valor de los mensajes flash con el nombre asignado en .flash('')
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  // Los mensajes de error provenientes de passport.js se envian mediante una variable 'error'
  res.locals.error = req.flash("error");
  // Si quisieramos personalizar las vistas de los usuarios con, por ejemplo, su nombre de usuario, debemos crear una variable global. En el caso de passport.js, los datos del usuario se almacenan en el objeto req.
  res.locals.user = req.user || null;
  next();
});
// Routes: Se le daran a conocer las rutas al servidor.
app.use(require("./routes/main"));
app.use(require("./routes/authentication"));

// Start the server
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
