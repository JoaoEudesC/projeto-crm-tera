// configuraçaão dos modulos
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors());
require("dotenv").config();

const router = require("./routes/userRoutes")
app.use(express.json())

const db = require("./config/database")
db.connect();










//Rotas , passo o router aqui para pegar as funções que estão no router e passalas aqui , utilizo o app.use , para definir uma rota principal para minha aplicação
app.use(router)

app.use("/users" , router)













module.exports = app;