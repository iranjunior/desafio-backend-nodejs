const faker = require("faker");
const Regenx = require("randexp");

const UserModelMock = () => {
    const userDontExists = {
        checkUser: () =>
            new Promise(resolve => {
                setTimeout(resolve(false), 100);
            })
    };

    const userExists = {
        checkUser: () =>
            new Promise(resolve => {
                setTimeout(resolve(true), 100);
            })
    };
    const uuidUserInvalid = {
        findForId: () =>
            new Promise(resolve => {
                setTimeout(resolve(false), 100);
            })
    };
    const uuidUserValid = {
        findForId: () =>
            new Promise(resolve => {
                setTimeout(
                    resolve({
                        uuid: faker.random.uuid(),
                        name: faker.name.findName(),
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                        phones: [
                            {
                                ddd: new Regenx(/^0\d{2}$/).gen(),
                                phone: new Regenx(/^[0-9]{8,11}$/).gen()
                            },
                            {
                                ddd: new Regenx(/^0\d{2}$/).gen(),
                                phone: new Regenx(/^[0-9]{8,11}$/).gen()
                            }
                        ],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        last_login: new Date(),
                        token: new Regenx(/ .+/).gen()
                    }),
                    100
                );
            })
    };
    const passwordIncorret = {
        verifyPassword: () =>
            new Promise(resolve => {
                setTimeout(resolve(false), 100);
            })
    };
    const passwordCorrect = {
        verifyPassword: () =>
            new Promise(resolve => {
                setTimeout(resolve(true), 100);
            })
    };

    const problemLogin = {
        loginUser: () =>
            new Promise((resolve, reject) => {
                setTimeout(
                    reject(new Error({ message: "Ocorreu um erro no Banco de dados" })),
                    100
                );
            })
    };
    const problemDatabase = {
        checkUser: () =>
            new Promise((resolve, reject) => {
                setTimeout(
                    reject(new Error({ message: "Ocorreu um erro no Banco de dados" })),
                    100
                );
            })
    };
    const createUser = {
        create: () =>
            new Promise(resolve => {
                setTimeout(
                    resolve({
                        uuid: faker.random.uuid(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        last_login: new Date(),
                        token: new Regenx(/ .+/).gen()
                    }),
                    100
                );
            })
    };
    const loginSuccess = {
        loginUser: () =>
            new Promise(resolve => {
                setTimeout(
                    resolve({
                        uuid: faker.random.uuid(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        last_login: new Date(),
                        token: new Regenx(/ .+/).gen()
                    }),
                    100
                );
            })
    };
    const updateSuccess = {
        updateOne: () =>
            new Promise(resolve => {
                setTimeout(
                    resolve({
                        n: 1,
                        uuid: faker.random.uuid(),
                        name: faker.name.findName(),
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                        phones: [
                            {
                                ddd: new Regenx(/^0\d{2}$/).gen(),
                                phone: new Regenx(/^[0-9]{8,11}$/).gen()
                            },
                            {
                                ddd: new Regenx(/^0\d{2}$/).gen(),
                                phone: new Regenx(/^[0-9]{8,11}$/).gen()
                            }
                        ],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        last_login: new Date(),
                        token: new Regenx(/ .+/).gen()
                    }),
                    100
                );
            })
    };
    const updateFaield = {
        updateOne: () =>
            new Promise(resolve => {
                setTimeout(
                    resolve({
                        n: 0,
                        nModificated: 0,
                        ok: 1
                    }),
                    100
                );
            })
    };
    const deleteUserSucess = {
        deleteOne: () =>
            new Promise(resolve => {
                setTimeout(resolve({}), 100);
            })
    };
    const deleteUserFailed = {
        deleteOne: () =>
            new Promise((resolve, reject) => {
                setTimeout(reject(new Error({ message: "Erro ao apagar usuario" })), 100);
            })
    };
    return {
        userExists: () => ({ ...userExists }),
        problemDatabese: () => ({ ...problemDatabase }),
        createUser: () => ({ ...userDontExists, ...createUser }),
        userDontExists: () => ({ ...userDontExists }),
        passwordIncorret: () => ({ ...userExists, ...passwordIncorret }),
        passwordCorrect: () => ({ ...userExists, ...passwordCorrect }),
        problemLogin: () => ({ ...userExists, ...passwordCorrect, ...problemLogin }),
        loginSuccess: () => ({ ...userExists, ...passwordCorrect, ...loginSuccess }),
        uuidInvalid: () => ({ ...uuidUserInvalid }),
        updateSuccess: () => ({ ...updateSuccess }),
        updateFaield: () => ({ ...updateFaield }),
        deleteUserSucess: () => ({ ...deleteUserSucess }),
        deleteUserFailed: () => ({ ...deleteUserFailed })
    };
};

module.exports = UserModelMock;
