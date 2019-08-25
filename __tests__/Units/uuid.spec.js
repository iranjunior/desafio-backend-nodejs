const uuid = require("uuid/v4");
const short = require("short-uuid");
const check = require("is-uuid");

describe("Testar criação de ids universais", () => {
  it("Criar corretamente um uuid", () => {
    const id = uuid();
    expect(check.v4(id)).toBe(true);
  });
  it("Criar corretamente um uuid curto", () => {
    const id = short.generate();
    const translator = short();

    expect(check.v4(translator.toUUID(id))).toBe(true);
  });
});
