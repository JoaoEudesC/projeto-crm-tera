const request = require("supertest");

const app = require("../../app");
const db = require("../../config/database");
const User = require("../../models/userSchema");

describe("get user by id and show email", () => {
    let createdUserId;

    beforeAll(async () => {
        await db.connect();

        // Create a test user before the tests
        const newUser = new User({
            nome: "Usuário de Teste",
            email: "testuser@example.com",
            senha: "senha123",
            cep: "705513144",
            logradouro: "conquista",
            bairro: "boa viagem",
            localidade: "zona sul",
            uf: "Pernambuco",
        });

        const createdUser = await newUser.save();
        // eslint-disable-next-line no-underscore-dangle
        createdUserId = createdUser._id;
    });

    it("should be able to get a user by id and return only the email", async () => {
        const response = await request(app).get(`/email/${createdUserId}`);

        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        // Clean up the test user after the tests
        await User.deleteOne({ _id: createdUserId });
    });
});
