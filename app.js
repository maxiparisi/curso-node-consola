require('colors');

const { guardarDB, leerDB } = require('./helpers/dataManager');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listarTareasToCheck } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const  main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB) {
       tareas.cargarTareas(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt.opcionSeleccionada) {
            case '1':
                const descripcion = await leerInput('Descripción:');
                tareas.crearTarea(descripcion);
                break;
            case '2':
                tareas.listarTareas();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                    const ids = await listarTareasToCheck(tareas.listarTareasArray);
                    tareas.toggleCompletadas(ids);
                    break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listarTareasArray);
                if(id!=='0'){
                    const ok = await confirmar('¿Borrar?');
                    console.log(ok);
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log("Tarea Borrada");
                    }
                }
                break;
        }

        guardarDB(tareas.listarTareasArray);

        await pausa(opt.opcionSeleccionada);

    } while (opt.opcionSeleccionada !== '0')
}


main();