const app = require("./src/app");

// Config do dotenv para podemos exportar a porta que será usada
require("dotenv").config();

const { PORT } = process.env;

// Função para exibir o link de onde o servidor irá rodar, basicamente o endereço do servidor
app.listen(PORT, () =>
    console.log(`o servidor esta rodando em http://localhost:${PORT} `)
);
