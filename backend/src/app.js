const cors = require("cors");
const express = require("express");
const swaggerUI = require("swagger-ui-express");

const db = require("./config/database");
const router = require("./routes/userRoutes");
const swaggerFile = require("./swagger.json");

require("dotenv").config();

const app = express();
app.use(cors());

const port = process.env.PORT;
console.log(port);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(express.json());

db.connect();

// Aplicando metodo para poder utilizar o router e definir qual será a rota principal do meu projeto
app.use(router);
app.use("/", router);

module.exports = app;
