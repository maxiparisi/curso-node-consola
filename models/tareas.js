const Tarea = require('./tarea');

class Tareas {
    listaDeTareas = {};

    constructor() {
        this.listaDeTareas = {};
    }

    crearTarea(descripcion = ''){
        const tarea = new Tarea(descripcion);
        this.listaDeTareas[tarea.id] = tarea;

    }

    cargarTareas(tareas = []) {
        console.log(tareas);
        tareas.forEach( tarea => {
            this.listaDeTareas[tarea.id] = tarea;
        })
    }

    get listarTareasArray() {
        const listado = [];
        Object.keys(this.listaDeTareas).forEach(key => {
            listado.push(this.listaDeTareas[key]);
        })
        return listado;
    }
}

module.exports = Tareas;