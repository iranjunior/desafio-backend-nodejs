const mongoose = require('../../src/Config/database');

describe('Deve conectar ao banco corretamente', () => {
  it('conectar com uri de test', () => {
    expect(mongoose.connect()).toBeDefined();
  });
});
