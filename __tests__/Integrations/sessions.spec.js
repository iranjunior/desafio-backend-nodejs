const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../Utils/truncate");
const faker = require("faker");
let user;
describe("Testar autenticação de usuarios", () => {
  /* beforeAll(async () => {
    await truncate.user();
  }); */
  afterAll(async () => {
    await truncate.user();
  });

  beforeEach(() => {
    user = {
      name: faker.name.findName(),
      email: "testekhg@test.com.br",
      password: "12344444",
      phones: [
        faker.phone.phoneNumberFormat(1),
        faker.phone.phoneNumberFormat(1),
        faker.phone.phoneNumberFormat(1)
      ]
    };
  });

  it("Deve Criar um usuario com sucesso", async () => {
    const response = await request(app)
      .post("/signup")
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
        phones: user.phones
      });

    expect(response.status).toBe(201);
  });

  it("Deve retornar 404 devido o email não existir", async () => {
    user.email = faker.internet.email();
    const response = await request(app)
      .post("/signin")
      .send({
        email: user.email,
        password: user.password
      });
    expect(response.status).toBe(404);
  });
  it("Deve retornar 500 devido a senha está errada", async () => {
    user.password = faker.internet.password();
    const response = await request(app)
      .post("/signin")
      .send({
        email: user.email,
        password: user.password
      });
    expect(response.status).toBe(404);
  });
  it("Deve retornar 200 devido as informações estarem certa", async () => {
    const response = await request(app)
      .post("/signin")
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.status).toBe(200);
  });
});
