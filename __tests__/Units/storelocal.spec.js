const { storeLocal } = require('../../src/App/Controllers/userController');
const trucante = require('../Utils/truncate');
const faker = require('faker');
const Regenx = require('randexp');

const responseMock = {
    status: (someStatusCode) => ({
        json: (someJsonBody) => ({
            send: () => ({
                status: someStatusCode,
                body: someJsonBody,
            })
        })
    })
}
const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phones:[{
        ddd: new Regenx(/^0\d{2}$/).gen(),
        phone: new Regenx(/^[0-9]{8,11}$/).gen()
    },{
        ddd: new Regenx(/^0\d{2}$/).gen(),
        phone: new Regenx(/^[0-9]{8,11}$/).gen()
    }]
}

const userModelMock = {
    checkUser: (email) => true,
    create: (obj) => ({
        uuid: faker.random.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        last_login: new Date(),
        token: new Regenx(/ .+/).gen(),
    })
}

describe("Teste de store no Controller", () => {
    beforeAll(async () => {

        await trucante.user()
    });
    afterAll(async () => {
        await trucante.user()
    });

    it("Deve Falhar pois usuario já exist", () => {
        const response =  storeLocal({body: user}, responseMock, userModelMock)

        expect(response.status).toBe(404)
    })

})
