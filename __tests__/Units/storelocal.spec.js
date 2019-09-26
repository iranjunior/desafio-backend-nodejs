const { storeLocal } = require('../../src/App/Controllers/userController');
const trucante = require('../Utils/truncate');
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

let userModelMockUserExist = {
    checkUser: (email) => {
        return new Promise(resolve => {
            setTimeout(resolve(true), 100);
        })
    }
}
let userModelMockProblemInCheck = {
    checkUser: (email) => {
        return new Promise((resolve, reject ) =>{
            setTimeout(reject(new Error({message: "deu errado"})), 100)
        })
    }
}
let userModelMockCreateUserSuccess = {
    checkUser: (email) => {
        return new Promise(resolve => {
            setTimeout(resolve(false), 100);
        })
    },
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

    it("Deve Falhar pois usuario já exist", async () => {
        const response =  await storeLocal({body: user}, responseMock, userModelMockUserExist)

        expect(response.status).toBe(403)
    })
    it("Deve Falhar na requisição ao banco", async () =>{
    const response  = await storeLocal({body: user}, responseMock, userModelMockProblemInCheck)

        expect(response.status).toBe(500);
    })
    it("Deve salvar usuario corretamente", async() => {
        const response = await storeLocal({body: user}, responseMock, userModelMockCreateUserSuccess)

        expect(response.status).toBe(201)
    })
})
