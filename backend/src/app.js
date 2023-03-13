// Configuraçaão dos modulos do pacote express e cors
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors());


require("dotenv").config()
const port = process.env.PORT
console.log(port)

//Arquivo de router para que a gente possa utilizar o metodo de routes no projeto
const router = require("./routes/userRoutes")
app.use(express.json())


//Arquivo de conexão com o banco de dados
const db = require("./config/database")
db.connect();




//Aplicando metodo para poder utilizar o router e definir qual será a rota principal do meu projeto
app.use(router)
app.use("/users" , router)







module.exports = app;