const request = require('supertest');
const faker = require('faker');
const app = require('../../src/app');
const truncate = require('../Utils/truncate');

let user;
describe('Testar Criação de Usuarios', () => {
  beforeAll(async () => {
    await truncate.user();
  });
  afterAll(async () => {
    await truncate.user();
  });
  beforeEach(() => {
    user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phones: [
        {
          ddd: '081',
          phone: '997638430',
        },
        {
          ddd: '011',
          phone: '997638430',
        },
        {
          ddd: '087',
          phone: '997638430',
        },
      ],
    };
  });

  it('Deve retornar 400 caso o email enviado seja invalido', async () => {
    user.email = 'teste@teste';
    const response = await request(app)
      .post('/signup')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
        phones: user.phones,
      });
    expect(response.status).toBe(400);
  });

  it('Deve retornar 400 caso o email ser do tipo undefined', async () => {
    user.email = undefined;
    const response = await request(app)
      .post('/signup')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
        phones: user.phones,
      });
    expect(response.status).toBe(400);
  });

  it('Deve retornar 400 caso o nome enviado seja invalido com apenas um caracter', async () => {
    user.name = 't';
    const response = await request(app)
      .post('/signup')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    expect(response.status).toBe(400);
  });

  it('Deve retornar 400 caso o nome enviado seja invalido com mais de 100 um caracter', async () => {
    user.name = 'Lorem ipsum é um texto utilizado para preencher espaços, com a finalidade de verificar o layout, tipografia e formatação antes de utilizar o conteúdo real.';

    const response = await request(app)
      .post('/signup')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    expect(response.status).toBe(400);
  });

  it('Deve retornar 400 caso o senha enviada tenha menos de 4 caracteres', async () => {
    user.password = 'sa2';
    const response = await request(app)
      .post('/signup')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    expect(response.status).toBe(400);
  });

  it('Deve Criar um usuario com sucesso', async () => {
    user.email = 'iranjunior94@gmail.com';
    user.password = 'ir@nDROIDF-32';
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

  it('Deve retornar 403 caso o usuario já existe', async () => {
    user.email = 'iranjunior94@gmail.com';
    const response = await request(app)
      .post('/signup')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
        phones: user.phones,
      });
    expect(response.status).toBe(403);
  });
});
