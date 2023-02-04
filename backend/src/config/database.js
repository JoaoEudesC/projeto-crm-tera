//Importação do mongoose para realizar a ligação do node com o banco de dados
const mongoose = require("mongoose")

//Config do dotenv para que possamos deixar nossa app mais evitando que informações cruciais suba para o github
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

//Função de conexão do mongodb atlas com o nodejs
const connect = async()=>{
    try{
        await mongoose.connect(MONGODB_URI , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Banco conectado")
    }catch (error) {
        console.log("Erro " , error.message)
    }
};



module.exports ={
    connect,
};
