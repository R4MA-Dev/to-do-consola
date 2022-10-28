import fs from "node:fs"

const guardarDB = (data)=>{
    fs.mkdirSync("./db",{recursive: true})

    fs.writeFileSync(`./db/data.json`, JSON.stringify(data))
}

const leerDb = ()=>{
    if(!fs.existsSync("./db/data.json")){
        return null
    }else{
        const info = fs.readFileSync("./db/data.json", { encoding : "utf-8" })
        const data = JSON.parse(info)

        return data
    }
}


export {guardarDB, leerDb}