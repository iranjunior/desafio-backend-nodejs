const { storeLocal } = require('../../src/App/Controllers/userController');
const trucante = require('../Utils/truncate');
const UserModelMock = require('../Utils/generateUserModelMock');
const faker = require('faker');
const Regenx = require('randexp');


const responseMock = () => ({
    status: (someStatusCode) => ({
        json: (someJsonBody) => ({
            send: () => ({
                status: someStatusCode,
                body: someJsonBody,
            })
        })
    })
})

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

describe("Teste de store no Controller", () => {
    beforeAll(async () => {
        await trucante.user()
    });
    afterAll(async () => {
        await trucante.user()
    });

    it("Deve Falhar pois usuario já exist", async () => {
        const response =  await storeLocal({body: user}, responseMock(), UserModelMock().userExists())

        expect(response.status).toBe(403)
    })
    it("Deve Falhar na requisição ao banco", async () =>{
        const response  = await storeLocal({body: user}, responseMock(), UserModelMock().problemDatabese())

        expect(response.status).toBe(500);
    })
    it("Deve salvar usuario corretamente", async() => {
        const response = await storeLocal({body: user}, responseMock() , UserModelMock().createUser())

        expect(response.status).toBe(201)
    })
})
