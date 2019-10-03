const faker = require('faker');
const Regenx = require('randexp');
const { authLocal } = require('../../src/App/Controllers/sessionControllers');
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
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phones: [
    {
      ddd: new Regenx(/^0\d{2}$/).gen(),
      phone: new Regenx(/^[0-9]{8,11}$/).gen(),
    },
    {
      ddd: new Regenx(/^0\d{2}$/).gen(),
      phone: new Regenx(/^[0-9]{8,11}$/).gen(),
    },
  ],
};

describe('Testes a authenticacao do usuario', () => {
  it('Deve falhar devido ao usuario nao existir', async () => {
    const response = await authLocal(
      { body: user },
      responseMock(),
      UserModelMock().userDontExists(),
    );

    expect(response.status).toBe(404);
  });

  it('Deve falhar na verificacao da senha', async () => {
    const response = await authLocal(
      { body: user },
      responseMock(),
      UserModelMock().passwordIncorret(),
    );

    expect(response.status).toBe(404);
  });

  it('Deve falhar ao logar usuario', async () => {
    const response = await authLocal(
      { body: user },
      responseMock(),
      UserModelMock().problemLogin(),
    );

    expect(response.status).toBe(500);
  });

  it('Deve Logar usuario com sucesso', async () => {
    const response = await authLocal(
      { body: user },
      responseMock(),
      UserModelMock().loginSuccess(),
    );

    expect(response.status).toBe(200);
  });
});
