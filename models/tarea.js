const { v4:generadorId } = require('uuid');

class Tarea {

    id = '';
    descripcion = '';
    completadoEn = null

    constructor( desc ) {

        this.id = generadorId();
        this.descripcion = desc;
        this.completadoEn = null;

    }

}

module.exports = Tarea;