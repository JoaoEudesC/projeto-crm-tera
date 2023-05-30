const request = require("supertest");

const app = require("../../app");
const db = require("../../config/database");
const User = require("../../models/userSchema");

describe("Create a new user", () => {
    let createdUserId;

    beforeAll(async () => {
        await db.connect();
    });

    it("should be able to create a new user", async () => {
        const response = await request(app).post("/create").send({
            nome: "joao1234",
            email: "joaoeudes@gmail.com",
            senha: "12345",
            cep: "705513144",
            logradouro: "conquista",
            bairro: "boa viagem",
            localidade: "zona sul",
            uf: "Pernambuco",
        });

        expect(response.status).toBe(201);
        createdUserId = response.body.id; // Assuming the response body contains the created user's ID
    });

    afterAll(async () => {
        await User.deleteOne({ id: createdUserId }).exec(); // Add .exec() to ensure the query execution
    });
});
