import Tarea from "./tarea.js";
import colors from 'colors';

class Tareas {
    _listado = {};


    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea)
        })

        return listado
    }


    constructor(){
        this._listado = {}
    }


    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }


    cargarTareas(tareas = []){
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea
        })

        return this._listado
    }


    crearTarea(desc){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }


    listadoCompleto(){
        console.clear()
        
        for(let i = 0; i < this.listadoArr.length; i++){
            console.log(` ${i + 1}. `.green +
            `${this.listadoArr[i].description.trim()} ${"::".yellow} ` + 
            `${this.listadoArr[i].completadoEn === null ? "Pendiente".red : "Completada".green}` + "\n")
        }
    }


    listarCompletasPendientes(boolean){
        if(boolean === true){
            console.clear()
            const tareasCompletadas = []
            this.listadoArr.forEach(tarea =>{
                if(tarea.completadoEn !== null){
                    tareasCompletadas.push(tarea)
                    console.log(` . ${tarea.description}`.green)
                }
            })
            return tareasCompletadas

        }else{
            console.clear()
            const tareasPendientes = [] 
            this.listadoArr.forEach(tarea =>{
                if(tarea.completadoEn === null){
                    tareasPendientes.push(tarea)
                    console.log(` . ${tarea.description}`.red)
                }
            })
            return tareasPendientes
        }
    }


    cambiarEstadoTarea(ids = []){
        ids.forEach(id =>{
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = true
            }
        })

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}

export default Tareas