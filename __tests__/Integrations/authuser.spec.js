/* eslint-disable require-atomic-updates */
const jwt = require('jsonwebtoken');
const request = require('supertest');
const faker = require('faker');
const app = require('../../src/app');
const truncate = require('../Utils/truncate');
const { secret } = require('../../src/Config/vars');

const user = {};

describe('Testar rotas autenticadas', () => {
  beforeAll(async () => {
    await truncate.user();
  });
  afterAll(async () => {
    await truncate.user();
  });

  beforeEach(() => {
    user.name = faker.name.findName();
    user.email = 'testekhg@test.com';
    user.password = '12sdsfds@fds';
    user.phones = [
      {
        ddd: '081',
        phone: '97907717',
      },
      {
        ddd: '081',
        phone: '85741254',
      },
      {
        ddd: '081',
        phone: '977656385',
      },
    ];
  });

  it('Deve Criar um usuario com sucesso', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
        phones: user.phones,
      });

    expect(response.status).toBe(201);
  });

  it('Deve logar com sucesso', async () => {
    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
        password: user.password,
      });
    user.token = response.body.user.token;
    user.uuid = response.body.user.uuid;
    expect(response.status).toBe(200);
  });
  it('Deve errar devido a falta de token', async () => {
    const response = await request(app).get('/user/1234');

    expect(response.status).toBe(401);
  });
  it('Deve errar devido a uuid incorreto', async () => {
    const response = await request(app)
      .get('/user/1234')
      .set('Authorization', `Bearer ${user.token}`);

    expect(response.status).toBe(404);
  });
  it('Deve dar errado devido ao token ter expirado', async () => {
    const token = jwt.sign(
      {
        data: faker.random.hexaDecimal,
      },
      secret,
      { expiresIn: '1ms' },
    );
    const response = await request(app)
      .get(`/user/${user.uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
  it('Deve dar errado devido ao não ser o mesmo do usuario', async () => {
    const token = jwt.sign(
      {
        data: faker.random.hexaDecimal,
      },
      secret,
      { expiresIn: '1h' },
    );
    const response = await request(app)
      .get(`/user/${user.uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
  it('Deve dar certo devido ao token valido e uuid correto', async () => {
    const response = await request(app)
      .get(`/user/${user.uuid}`)
      .set('Authorization', `Bearer ${user.token}`);
    expect(response.status).toBe(200);
  });
});
