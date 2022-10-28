import colors from 'colors';
import { inquirerMenu, pausa, leerInput, completarTareas, borrarTareas, confirmar } from './helpers/inquirer.js';
import Tareas from './models/tareas.js';
import { guardarDB, leerDb } from './helpers/guardarArchivo.js';

const main = async()=>{
    let opt = ""
    const tareas = new Tareas()

    const tareasDB = leerDb()

    if(tareasDB){
        tareas.cargarTareas(tareasDB)
    }

    do{
        opt = await inquirerMenu()
        switch(opt){

            case 1:
                const desc = await leerInput("Descripción:")
                tareas.crearTarea(desc) 
                break;

            case 2:
                tareas.listadoCompleto()
                break;

            case 3:
                const tareasCompletas = tareas.listarCompletasPendientes(true)
                if(tareasCompletas.length === 0){
                    console.log(" No tienes tareas completadas".yellow)
                }
                break;

            case 4:
                const tareasPendientes = tareas.listarCompletasPendientes(false)
                if(tareasPendientes.length === 0){
                    console.log(" No tienes tareas pendientes".yellow)
                }
                break;

            case 5:
                const ids = await completarTareas(tareas.listadoArr)
                tareas.cambiarEstadoTarea(ids)
                break;

            case 6:
                const id = await borrarTareas(tareas.listadoArr)
                if(id !== 0){
                    const confirm = await confirmar("¿Estas seguro?")
                    if(confirm){
                        tareas.borrarTarea(id)
                        console.log(" La tarea ha sido borrada".yellow)
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr)

        if(opt !== 0){
            await pausa()
        }else{
            console.clear()
        }

    }while(opt !== 0)
}

main()