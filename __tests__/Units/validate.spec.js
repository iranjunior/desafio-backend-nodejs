const faker = require("faker");
const validate = require("../../src/Utils/validate");

describe("Testar a validação dos campos", () => {
  it("Deve falhar no email", () => {
    const error = validate(
      faker.name.findName(),
      "test@test",
      faker.internet.password()
    );
    expect(error.length).toBe(1);
  });
  it("Deve falhar no nome devido ao nome ter apenas uma letra", () => {
    const error = validate(
      "t",
      faker.internet.email().toLowerCase(),
      faker.internet.password()
    );
    expect(error.length).toBe(1);
  });
  it("Deve falhar no nome devido ao nome ter muitos caracteres", () => {
    const error = validate(
      faker.lorem.text(),
      faker.internet.email().toLowerCase(),
      faker.internet.password()
    );
    expect(error.length).toBe(1);
  });
  it("Deve falhar a senhar ser muito curta", () => {
    const error = validate(
      faker.name.firstName(),
      faker.internet.email().toLowerCase(),
      "123"
    );

    expect(error.length).toBe(1);
  });
});
