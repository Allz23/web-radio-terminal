// Validamos los campos de los formularios usando los metodos de express-validator
// Almacenaremos los metodos de validacion aplicados en este archivo
const { check, body, validationResult } = require("express-validator");

// Describimos las reglas de validacion para el operario
const reglasValidacionOperario = () => {
 return [
  // El campo 'cedula' no puede estar vacio.
  body("cedula")
   .not()
   .isEmpty()
   .withMessage("Complete todos los campos.")
 ];
};

const reglasValidacionOperarioPC = () => {
 return [
  // El campo 'nombre' no puede estar vacio.
  body("nombre")
   .not()
   .isEmpty()
   .withMessage("Complete todos los campos.")
 ];
};

const reglasValidacionChofer = () => {
 return [
  // El campo 'nombre' no puede estar vacio.
  body("cedulaC")
   .not()
   .isEmpty()
   .withMessage("Complete todos los campos.")
 ];
};

// Ahora, validamos que no haya ningun error para poder continuar
const validar = (req, res, next) => {
 const errores = validationResult(req);
 if (errores.isEmpty()) {
  return next();
 }
 const extractedErrors = [];
 // Si hay errores, se los mostramos al usuario.
 errores.array().map(err => extractedErrors.push(err.msg));
 req.flash("error", extractedErrors);

 return res.render("body layouts/index");
};

// Ahora, validamos que no haya ningun error para poder continuar
const validarPC = (req, res, next) => {
 const errores = validationResult(req);
 if (errores.isEmpty()) {
  return next();
 }
 const extractedErrors = [];
 // Si hay errores, se los mostramos al usuario.
 errores.array().map(err => extractedErrors.push(err.msg));
 req.flash("error", extractedErrors);

 return res.render("body layouts/PC/login", {
  layout: "pc-login"
 });
};

// Ahora, validamos que no haya ningun error para poder continuar
const validarChofer = (req, res, next) => {
 const errores = validationResult(req);
 if (errores.isEmpty()) {
  return next();
 }
 const extractedErrors = [];
 // Si hay errores, se los mostramos al usuario.
 errores.array().map(err => extractedErrors.push(err.msg));
 req.flash("error", extractedErrors);

 return res.render("body layouts/chofer", {
  layout: "main"
 });
};

module.exports = {
 reglasValidacionOperario,
 reglasValidacionOperarioPC,
 reglasValidacionChofer,
 validar,
 validarPC,
 validarChofer
};
