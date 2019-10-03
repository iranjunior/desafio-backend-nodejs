const request = require('supertest');
const faker = require('faker');
const app = require('../../src/app');
const truncate = require('../Utils/truncate');

let user;
describe('Testar autenticação de usuarios', () => {
  beforeAll(async () => {
    user = {
      name: faker.name.findName(),
      email: 'testekhg@test.com',
      password: '12sdsfds@fds',
      phones: [
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
      ],
    };

    await truncate.user();
  });
  afterAll(async () => {
    await truncate.user();
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

  it('Deve retornar 404 devido o email não existir', async () => {
    user.email = faker.internet.email();
    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(response.status).toBe(404);
  });


  it('Deve retornar 404 devido a senha está errada', async () => {
    user.email = 'testekhg@test.com';
    user.password = faker.internet.password();
    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(response.status).toBe(404);
  });


  it('Deve retornar 200 devido as informações estarem certa', async () => {
    user.email = 'testekhg@test.com';
    user.password = '12sdsfds@fds';

    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);
  });
});
