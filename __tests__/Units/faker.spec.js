const faker = require('faker');

describe('Criação de elementos', () => {
  it('Deve criar um nome', () => {
    const name = faker.name.findName();
    expect(name.length).toBeGreaterThan(1);
  });
  it('Deve criar um email', () => {
    const email = faker.internet.email();
    expect(email.length).toBeGreaterThan(1);
  });
  it('Deve criar uma senha', () => {
    const password = faker.internet.password();
    expect(password.length).toBeGreaterThan(1);
  });
  it('Deve criar um telefone', () => {
    const phone = faker.phone.phoneNumberFormat(1);
    expect(phone.length).toBeGreaterThan(1);
  });
});
