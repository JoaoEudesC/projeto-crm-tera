const cors = require("cors");
const express = require("express");

const db = require("./config/database");
const router = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

db.connect();

// Aplicando metodo para poder utilizar o router e definir qual será a rota principal do meu projeto
app.use(router);
app.use("/", router);

module.exports = app;
