const request = require('supertest');
const faker = require('faker');
const Regenx = require('randexp');
const truncate = require('../Utils/truncate');
const app = require('../../src/app');
const user = {};

describe('Testar atualizacao de usuarios', () => {
    beforeAll(async () => {
        await truncate.user()
    });

    afterAll(async () => {
        await truncate.user()
    });
    beforeEach(() => {

            user.name = faker.name.findName();
            user.email = faker.internet.email();
            user.password = faker.internet.password();
            user.phones = [
              {
                ddd: new Regenx(/^0[0-9]{2}$/).gen(),
                phone: new Regenx(/^[0-9]{8,11}$/).gen(),
              },
              {
                ddd: new Regenx(/^0[0-9]{2}$/).gen(),
                phone: new Regenx(/^[0-9]{8,11}$/).gen(),
              },
              {
                ddd: new Regenx(/^0[0-9]{2}$/).gen(),
                phone: new Regenx(/^[0-9]{8,11}$/).gen(),
              },
            ];

    });

    it('Deve criar um usuario com sucesso', async () => {
        user.email = 'iranjunior94@gmail.com';

        const response = await request(app).post('/signup').send(user)

        user.token = response.body.token
        expect(response.status).toBe(201);
    });
});
