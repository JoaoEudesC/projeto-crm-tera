const app = require("./src/app")
require("dotenv").config();
const PORT = process.env.PORT






//UTILIZANDO O: import app from "./src/app.js  => com essa nomeclatura é preciso passar a extensão da linguagem que neste caso é js"





app.listen(PORT , () => console.log(`o servidor esta rodando em http://localhost:${PORT} `))


//rotas



