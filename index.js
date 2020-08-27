const { argvs } = require("./config");
const porHacer = require("./to-do");
const path = require("path");
let comando = argvs._[0];
switch (comando) {
  case "crear":
    porHacer.crear(argvs.descripcion);
    break;
  case "listar":
    porHacer.listar();
    break;
  case "actualizar":
    porHacer.actualizar(argvs.id, argvs.completado);
    break;
  case "borrar":
    porHacer.borrar(argvs.id);
    break;
  case "vaciar":
    porHacer.vaciar();

    break;
  default:
    console.log("Comando desconocido");
    break;
}
