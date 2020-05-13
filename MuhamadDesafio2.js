const mongoclient = require ('mongodb').MongoClient;
const chalk = require('chalk');

const url  ="mongodb+srv://admin:95553268@cluster0-jyi2d.mongodb.net/test?retryWrites=true&w=majority"  
const cliente= new mongoclient(url, {useNewUrlParser:true, useUnifiedTopology: true});





const zip = {
    _id: "5c8eccc1caa187d17ca6ed15",
    city: "CABA",
    zip: "7777",
    loc: { y: "38.409002", x: "68.947547" },
    pop: "55555",
    state: "BA"
  }


function connectar(Bd, coleccion){
    return new Promise((resolve,reject)=>{
        cliente.connect().then(function(result){
            let colec = result.db(Bd).collection(coleccion);
            resolve(colec);
         
        })
        .catch((err)=>{
            reject(err);
           
        })
    })
}

async function MostrarBD(Bd, coleccion){
    let colec = await connectar(Bd, coleccion)
    colec.find().limit(1).toArray().then((result)=>{
        console.log(result);
        cliente.close();
    })
    .catch((err)=>{
        console.log(err);
        cliente.close();
    })
}




async function insertar(Bd, coleccion){
    let colec = await connectar(Bd, coleccion)
    colec.insertOne(zip).then(function(){
        console.log("zip ingresado")
        cliente.close()
    })
    .catch((err)=>{
        console.log(chalk.red('no se puedo ingresar el zip '+err))
        cliente.close()
    })
}

async function editar(Bd, coleccion){
    let colec = await connectar(Bd, coleccion);
    colec.updateOne({city: "ALPINE"}, {$set: {pop: "7777"}}).then(function(){
        console.log("zip actualizado")
        cliente.close()
    })
    .catch((err)=>{
        console.log(chalk.red(err))
        cliente.close()
    })
}

async function borrar(Bd, coleccion){
    let colecafec = await connectar(Bd, coleccion);
    colecafec.deleteOne({city: "CABA"}).then(function(){
        console.log(chalk.green("ZIP ELIMINADO"));
        cliente.close();
    })
    .catch((err)=>{
        console.log(chalk.red(err))
        cliente.close();
    })
}


function Crud (){
MostrarBD("sample_training", "zips")
//editar("sample_training", "zips")
//borrar("sample_training", "zips")
//insertar("sample_training", "zips")
}
Crud();
