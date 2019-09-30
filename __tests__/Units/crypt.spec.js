const bcrypt = require('bcryptjs');
const faker = require('faker');

describe('Testar o encripamento de senhas', () => {
  it('Deve criptografar a senha', () => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(faker.internet.password(), salt);
    expect(hash).toBeDefined();
  });
});
