const faker = require("faker");
const Regenx = require("randexp");

const UserModelMock = () => {
    const userDontExists = {
        checkUser: (email) => {
            return new Promise(resolve => {
                setTimeout(resolve(false), 100);
            });
        }
    };

    const userExists = {
        checkUser: (email) => {
            return new Promise(resolve => {
                setTimeout(resolve(true), 100);
            });
        }
    };
    const passwordIncorret = {
        verifyPassword: (email, password) => {
            return new Promise(resolve => {
                setTimeout(resolve(false), 100);
            });
        }
    };
    const passwordCorrect = {
        verifyPassword: (email, password) => {
            return new Promise(resolve => {
                setTimeout(resolve(true), 100);
            });
        }
    };

    const problemLogin = {
        loginUser: (email) => {
            return new Promise((resolve, reject) =>{
            setTimeout(reject(new Error({message: "Ocorreu um erro no Banco de dados"})), 100)
        })}
    };
    const problemDatabase = {
        checkUser: email => {
            return new Promise((resolve, reject) =>{
            setTimeout(reject(new Error({message: "Ocorreu um erro no Banco de dados"})), 100)
        })}
    };
    const createUser = {
        create: () => {return new Promise(resolve =>{
            setTimeout(resolve({
                uuid: faker.random.uuid(),
                createdAt: new Date(),
                updatedAt: new Date(),
                last_login: new Date(),
                token: new Regenx(/ .+/).gen(),
            }), 100)
        })}
    }
    const loginSuccess = {
        loginUser: () => {return new Promise(resolve =>{
            setTimeout(resolve({
                uuid: faker.random.uuid(),
                createdAt: new Date(),
                updatedAt: new Date(),
                last_login: new Date(),
                token: new Regenx(/ .+/).gen(),
            }), 100)
        })}
    }
    return {
        userExists:() => ({...userExists}),
        problemDatabese: () => ({...problemDatabase}),
        createUser: () => ({...userDontExists, ...createUser}),
        userDontExists: () => ({...userDontExists}),
        passwordIncorret: () => ({...userExists, ...passwordIncorret}),
        passwordCorrect: () => ({...userExists, ...passwordCorrect}),
        problemLogin: () => ({...userExists, ...passwordCorrect, ...problemLogin}),
        loginSuccess: () => ({...userExists, ...passwordCorrect, ...loginSuccess}),

    }
};

module.exports = UserModelMock
