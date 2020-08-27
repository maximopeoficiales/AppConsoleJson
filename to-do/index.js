const fs = require("fs");
const path = require("path");
const colors = require("colors");

let DB_PATH = path.join(__dirname + "/../DB/data.json");
let listadoPorHacer = [];
const getListado = () => {
  try {
    listadoPorHacer = require(DB_PATH);
  } catch (error) {
    listadoPorHacer = [];
  }
  return listadoPorHacer;
};

const vaciar = () => {
  fs.writeFileSync(DB_PATH, [], (err) => {
    if (err) throw Error("Error en el guardado ");
  });
  console.log("Vaciado correctamente");
};
const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFileSync(DB_PATH, data, (err) => {
    if (err) throw Error("Error en el guardado ");
  });
};
const crear = (descripcion) => {
  listadoPorHacer = getListado();
  let id = 1;
  if (listadoPorHacer.length !== 0) id = listadoPorHacer.length + 1;
  let actividad = {
    id,
    descripcion,
    completado: false,
  };
  listadoPorHacer.push(actividad);
  guardarDB();
  console.log(actividad);
};
const listar = (completado = false) => {
  let listado = getListado();
  if (listado.length !== 0)
    if (!completado) {
      for (let tarea of listado) {
        listarTareaEspecifica(tarea);
      }
    } else {
      let tareascompletados = listado.filter((e) => e.completado);
      if (tareascompletados.length !== 0) {
        for (let tarea of tareascompletados) {
          listarTareaEspecifica(tarea);
        }
      } else {
        console.log("No tareas completadas");
      }
    }
  else console.log("No hay registros que listar".cyan);
};
const actualizar = (id, completado = true) => {
  let index = getIndexListado(id);
  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    console.log(`Registro ${id} actualizado correctamente`);
  } else {
    console.log(`${id}, no encontrado`.red);
  }
};
const borrar = (id) => {
  let index = getIndexListado(id);
  if (index >= 0) {
    listadoPorHacer.splice(index, 1);
    guardarDB();
    console.log(`Registro ${id} borrado correctamente`);
  } else {
    console.log(`${id}, no encontrado`.red);
  }
};
const getIndexListado = (id) => {
  let listadoPorHacer = getListado();
  let index = listadoPorHacer.findIndex((tarea) => tarea.id == id);
  return index;
};
const listarTareaEspecifica = (tarea) => {
  console.log("===Por-Hacer====".green);
  console.log(tarea.id);
  console.log(tarea.descripcion);
  console.log("Estado: ", tarea.completado);
  console.log("================".green);
};
module.exports = {
  crear,
  vaciar,
  listar,
  actualizar,
  borrar,
};
