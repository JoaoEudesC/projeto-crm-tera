//Importação da var app  criado com o express no app.js
const app = require("./src/app")

//Config do dotenv para podemos exportar a porta que será usada
require("dotenv").config();
const PORT = process.env.PORT






//OBS: Utilizando o import app from "./src/app.js  => com essa nomeclatura do ESM é preciso passar a extensão da linguagem que neste caso é js"




//Função para exibir o link de onde o servidor irá rodar, basicamente o endereço do servidor
app.listen(PORT , () => console.log(`o servidor esta rodando em http://localhost:${PORT} `))





