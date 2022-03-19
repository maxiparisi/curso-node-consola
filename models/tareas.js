const Tarea = require('./tarea');
require('colors');

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

    listarTareas(){
        console.log();
        this.listarTareasArray.forEach( (tarea, indice) => {
            console.log(`${indice + 1}.`.green + ` ${tarea.descripcion} :: ${tarea.completadoEn?'Completada'.green:'Pendiente'.red}`);
        })
    }

    listarPendientesCompletadas(completada = true){
        console.log();
        this.listarTareasArray.filter(tarea => (tarea.completadoEn!==null)===completada).forEach( (tarea, indice) => {
            console.log(`${indice + 1}.`.green + ` ${tarea.descripcion} :: ${tarea.completadoEn?tarea.completadoEn.green:'Pendiente'.red}`)
        })
    }

    borrarTarea(id='') {
        if (this.listaDeTareas[id]){
            delete this.listaDeTareas[id];
        }
    }

    get listarTareasArray() {
        const listado = [];
        Object.keys(this.listaDeTareas).forEach(key => {
            listado.push(this.listaDeTareas[key]);
        })
        return listado;
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this.listaDeTareas[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listarTareasArray.filter(tarea => !ids.includes(tarea.id)).forEach(tarea => tarea.completadoEn = null);
    }
}

module.exports = Tareas;