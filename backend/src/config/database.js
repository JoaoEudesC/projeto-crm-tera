const mongoose = require("mongoose");
require("dotenv").config();

let { MONGODB_URI } = process.env;

if (process.env.NODE_ENV === "test") {
    MONGODB_URI = process.env.MONGODB_URI_TEST; // Caso eu execute testes de integração ele vai utilizar essa url de ligação  que é só para testes, caso contrário será a url default.
}

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Banco conectado");
    } catch (error) {
        console.log("Erro", error.message);
    }
};

module.exports = {
    connect,
};
