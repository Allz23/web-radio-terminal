// Archivo donde se guardan las verificaciones de inicio de sesion de los usuarios
module.exports = {
 isLoggedInRT(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash("error", "Inicie sesión para ver el contenido.");
  res.redirect("/");
 },
 isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash("error_msg", "Inicie sesión para ver el contenido.");
  res.redirect("/login");
 }
};
