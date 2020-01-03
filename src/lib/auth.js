// Archivo donde se guardan las verificaciones de inicio de sesion de los usuarios
module.exports = {
 isLoggedInRT(req, res, next) {
  if (req.isAuthenticated()) {
   return next();
  } else {
   req.flash("error", "Inicie sesión para ver el contenido.");
   res.redirect("/");
  }
 },
 isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
   console.log("Usuario autenticado");
   return next();
  } else {
   console.log("Usuario no autenticado");
   req.flash("error_msg", "Inicie sesión para ver el contenido.");
   res.redirect("/login");
  }
 }
};
