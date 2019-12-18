$(document).ready(function() {
 // Document ready, place your code below:

 // Variables usadas en el programa.
 let nombreCheck = $("#nombreCheck");
 let fechaCheck = $("#fechaCheck");
 let sesionCheck = $("#sesionCheck");
 let datePicker = $("#date");
 let selectNombre = $("#Nombre");
 let selectSesion = $("#Sesion");

 // Inicializaciones
 nombreCheck.prop("checked", true);
 datePicker.toggleClass("disabled").prop("disabled", true);
 selectSesion.toggleClass("disabled").prop("disabled", true);
 sesionCheck.prop({ disabled: true });
 fechaCheck.prop({ disabled: true });

 //Añadimos el comportamineto del checkbox de 'Fecha'
 $("#fechaCheck").on("click", function() {
  if (this.checked === true) {
   datePicker.toggleClass("disabled");
   datePicker.prop("disabled", false);
   // Al seleccionar, deshabilitamos los demas checkboxes, y les quitamos la propiedad 'checked'
   sesionCheck.prop({
    disabled: true,
    checked: false
   });
   nombreCheck.prop({
    disabled: true,
    checked: false
   });
  } else {
   datePicker.toggleClass("disabled");
   datePicker.prop("disabled", true);
   sesionCheck.prop({
    disabled: false,
    checked: false
   });
   nombreCheck.prop({
    disabled: false,
    checked: false
   });
  }
 });

 //Añadimos el comportamineto del checkbox de 'Sesion'
 $("#sesionCheck").on("click", function() {
  if (this.checked === true) {
   selectSesion.toggleClass("disabled");
   selectSesion.prop("disabled", false);
   // Al seleccionar, deshabilitamos los demas checkboxes, y les quitamos la propiedad 'checked'
   fechaCheck.prop({
    disabled: true,
    checked: false
   });
   nombreCheck.prop({
    disabled: true,
    checked: false
   });
  } else {
   selectSesion.toggleClass("disabled");
   selectSesion.prop("disabled", true);
   fechaCheck.prop({
    disabled: false,
    checked: false
   });
   nombreCheck.prop({
    disabled: false,
    checked: false
   });
  }
 });

 //Añadimos el comportamineto del checkbox de 'Nombre'
 $("#nombreCheck").on("click", function() {
  if (this.checked === true) {
   selectNombre.toggleClass("disabled");
   selectNombre.prop("disabled", false);
   // Al seleccionar, deshabilitamos los demas checkboxes, y les quitamos la propiedad 'checked'
   fechaCheck.prop({
    disabled: true,
    checked: false
   });
   sesionCheck.prop({
    disabled: true,
    checked: false
   });
  } else {
   selectNombre.toggleClass("disabled");
   selectNombre.prop("disabled", true);
   fechaCheck.prop({
    disabled: false,
    checked: false
   });
   sesionCheck.prop({
    disabled: false,
    checked: false
   });
  }
 });

 // Funcionalidad del selector de fecha
 $("#date").dateDropper({
  largeDefault: false,
  format: "Y-m-d",
  lang: "es"
 });

 $("#aExcel").tableExport({
  formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
  bootstrap: true, //Usar lo estilos de css de bootstrap para los botones (true, false)
  fileName: "Registro-Diario" //Nombre del archivo,
 });
});
