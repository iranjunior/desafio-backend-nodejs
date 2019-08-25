const jwt = require('jsonwebtoken');
const {
  secret
} = require("../../src/Config/vars");
const faker = require("faker");
describe("Teste de jwt", () => {
  let token;
  beforeEach(() => {
    token = jwt.sign({
      data: faker.random.hexaDecimal
    }, secret, {
      expiresIn: 10
    });

  })
  it("Deve gerar um token", () => {
    expect(jwt.verify(token, secret)).toBeDefined();

  })
})