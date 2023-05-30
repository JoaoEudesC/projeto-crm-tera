const request = require("supertest");

const app = require("../../app");
const db = require("../../config/database");

describe("list all users", () => {
    beforeAll(async () => {
        db.connect();
    });

    it("should be able to list all users", async () => {
        // Aumentar o tempo limite do teste para 5 segundos
        return request(app)
            .get("/all")
            .then((response) => {
                expect(response.status).toBe(200);
            })
            .catch((error) => {
                throw error; // Lançar o erro para que o Jest o capture e exiba corretamente
            });
    });
});
