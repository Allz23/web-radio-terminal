// Validamos la entrada de datos de otra manera en el formulario del modal
function validarFormulario() {
 let nombre = document.forms["choferForm"]["nombreC_chofer"].value;
 let cedula = document.forms["choferForm"]["cedula_chofer"].value;
 let sap = document.forms["choferForm"]["sap_chofer"].value;
 let nomina = document.forms["choferForm"]["nomina_chofer"].value;

 if (
  nombre === "" ||
  cedula === "" ||
  organizacion === "" ||
  sap === "" ||
  nomina === ""
 ) {
  alert("Faltan campos por completar.");
  return false;
 }
}
