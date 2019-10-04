const request = require("supertest");
const faker = require("faker");
const Regex = require("randexp");
const app = require("../../src/app");
const Token = require("../../src/Utils/refreshToken");
const truncate = require("../Utils/truncate");
const user = {};

describe("Testar e.xclusao de usuarios", () => {
    beforeAll(async () => {
        await truncate.user();
        user.name = faker.name.findName();
        user.email = faker.internet.email();
        user.password = faker.internet.password();
        user.phones = [
            {
                ddd: new Regex(/^0[0-9]{2}$/).gen(),
                phone: new Regex(/^[0-9]{8,11}$/).gen()
            }
        ];
    });
    afterAll(async () => {
        await truncate.user();
    });

    it("Deve Criar um usuario com sucesso", async () => {
        const response = await request(app)
            .post("/signup")
            .send(user);
        user.token = response.body.token;
        expect(response.status).toBe(201);
    });

    it("Deve apagar o usuario com sucesso", async () => {
        const response = await request(app)
            .delete("/user")
            .set("Authorization", `Bearer ${user.token}`);

        expect(response.status).toBe(200);
    });

    it("Deve falhar devido ao usuario ja ter sido deletado", async () => {
        const response = await request(app)
            .delete("/user")
            .set("Authorization", `Bearer ${Token.generateLocal(Date.now(), 2)}`);

        expect(response.status).toBe(404);
    });
});
