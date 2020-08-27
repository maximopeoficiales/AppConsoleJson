const descripcion = {
  type: "string",
  demand: true,
  alias: "d",
  desc: "Descripcion de la tarea por hacer",
};
const completado = {
  type: "boolean",
  alias: "c",
  default: true,
};
const id = {
  type: "number",
  demand: true,
  alias: "i",
  desc: "Id de la tarea",
};
const argvs = require("yargs")
  .command("crear", "Crear un tarea por realizar", {
    descripcion,
  })
  .command("actualizar", "Actualiza un tarea", {
    id,
    completado,
  })
  .command("listar", "Lista las tareas por hacer", {
    completado: { type: "boolean", alias: "c", default: false },
  })
  .command("vaciar", "vacia toda las tareas")
  .command("borrar", "borrar una tarea por id", {
    id,
  })
  .help().argv;

module.exports = {
  argvs,
};
