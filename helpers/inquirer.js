import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type : "list",
        name : "option",
        message : "¿Qué desea hacer?",
        choices : [
            {
                value : 1,
                name : `${"1.".green} Crear tarea`
            },
            {
                value : 2,
                name : `${"2.".green} Listar tareas`
            },
            {
                value : 3,
                name : `${"3.".green} Listar tareas completadas`
            },
            {
                value : 4,
                name : `${"4.".green} Listar tareas pendientes`
            },
            {
                value : 5,
                name : `${"5.".green} Completar tarea(s)`
            },
            {
                value : 6,
                name : `${"6.".green} Borrar tarea`
            },
            {
                value : 0,
                name : `${"0.".green} Salir`
            },

        ] 
    }
]

const inquirerMenu = async()=>{
    console.clear()
    console.log("=========================".green)
    console.log("  Seleccione una opcion".white)
    console.log("========================= \n".green)

    const { option } = await inquirer.prompt(preguntas)

    return option
}

const pausa = async()=>{
    console.log("\n")

    await inquirer.prompt([
        {
            type : "input",
            name : "Enter",
            message : `Presione ${"ENTER".green} para continuar`
        }
    ])
}

const leerInput = async(msg)=>{
    const pregunta = [
        {
            type : "input",
            name : "desc",
            message : msg,
            validate(value){
                if(value.length === 0 || value === " "){
                    return "Por favor ingrese un valor"
                }
                return true
            }
        }
    ]

    const {desc} = await inquirer.prompt(pregunta)
    return desc
}

const borrarTareas = async(tareas = [])=>{
    console.clear()
    const opciones = tareas.map( (tarea, indice) =>{
        return{
            value : tarea.id,
            name : `${indice + 1}. `.green + `${tarea.description}`
        }
    })

    opciones.unshift({
        value : 0,
        name : "0. ".green + "Cancelar \n"
    })

    const preguntas = [
        {
            type : "list",
            name : "id",
            message : "¿Qué tarea deseas borrar?".yellow,
            choices : opciones
        }
    ]

    const {id} = await inquirer.prompt(preguntas)
    return id
}

const completarTareas = async(tareas = [])=>{
    console.clear()
    const opciones = tareas.map( (tarea, indice) =>{
        return{
            value : tarea.id,
            name : `${indice + 1}. `.green + `${tarea.description}`,
            checked : (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type : "checkbox",
            name : "ids",
            message : "Seleccione las tareas".yellow,
            choices : opciones
        }
    ]

    const {ids}  = await inquirer.prompt(pregunta)
    return ids
}

const confirmar = async(msg)=>{
    const pregunta = [
        {
            type : "confirm",
            name : "ok",
            message : msg
        }
    ]

    const {ok} = await inquirer.prompt(pregunta)
    return ok
}

export { inquirerMenu, pausa, leerInput, completarTareas, borrarTareas, confirmar }