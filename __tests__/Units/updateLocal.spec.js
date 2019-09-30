const faker = require('faker');
const Regenx = require('randexp');
const { updateLocal } = require('../../src/App/Controllers/userController');
const UserModelMock = require('../Utils/generateUserModelMock');


const responseMock = () => ({
  status: (someStatusCode) => ({
    json: (someJsonBody) => ({
      send: () => ({
        status: someStatusCode,
        body: someJsonBody,
      }),
    }),
  }),
});

const user = {
  uuid: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phones: [{
    ddd: new Regenx(/^0\d{2}$/).gen(),
    phone: new Regenx(/^[0-9]{8,11}$/).gen(),
  }, {
    ddd: new Regenx(/^0\d{2}$/).gen(),
    phone: new Regenx(/^[0-9]{8,11}$/).gen(),
  }],
};

describe('Teste de store no Controller', () => {

    it('Deve falhar devido ao usuario nao existir', async () => {
        const response = await updateLocal({ headers: {authorization:  new Regenx(/^Bearer \w{90}$/).gen() } }, responseMock() , UserModelMock().updateFaield() )

        expect(response.status).toBe(500);
    });

    it('Deve atualizr usuario corretamente', async () => {
        const response = await updateLocal({ headers: {authorization:  new Regenx(/^Bearer \w{90}$/).gen() }, body: user}, responseMock(), UserModelMock().updateSuccess())

        expect(response.status).toBe(200)
    });
});
