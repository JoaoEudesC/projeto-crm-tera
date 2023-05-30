const request = require("supertest");

const app = require("../../app");
const db = require("../../config/database");
const User = require("../../models/userSchema");

describe("reset password", () => {
    // Variável para armazenar o token enviado

    beforeAll(async () => {
        await db.connect();

        // Criar um usuário de teste antes dos testes
        const newUser = new User({
            nome: "Usuário de Teste",
            email: "joaoeudes25012000@gmail.com",
            senha: "senha123",
            cep: "705513144",
            logradouro: "conquista",
            bairro: "boa viagem",
            localidade: "zona sul",
            uf: "Pernambuco",
        });

        await newUser.save();
        // eslint-disable-next-line no-underscore-dangle
    });

    it("should be able to send a email to the user with a token", async () => {
        const response = await request(app).post("/forgotPassword").send({
            email: "joaoeudes25012000@gmail.com",
        });

        expect(response.status).toBe(200);
        // Extrair o token da resposta
        // ... outras expectativas e asserções sobre a resposta
    });
});
