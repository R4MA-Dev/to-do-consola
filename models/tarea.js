import {v4 as uuidv4} from "uuid"

class Tarea {
    id = "";
    description = "";
    completadoEn = null

    constructor(desc){
        this.id = uuidv4()
        this.description = desc 
        this.completadoEn = null
    }
}

export default Tarea