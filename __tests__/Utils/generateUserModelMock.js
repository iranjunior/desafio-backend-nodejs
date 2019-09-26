const faker = require("faker");
const Regenx = require("randexp");

const UserModelMock = () => {
    const userDontExists = {
        checkUser: () => {
            return new Promise(resolve => {
                setTimeout(resolve(false), 100);
            });
        }
    };

    const userExists = {
        checkUser: () => {
            return new Promise(resolve => {
                setTimeout(resolve(true), 100);
            });
        }
    };
    const problemDatabase = {
        checkUser: () => {
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
    return {
        userExists:() => ({...userExists}),
        problemDatabese: () => ({...problemDatabase}),
        createUser: () => ({...userDontExists, ...createUser})
    }
};

module.exports = UserModelMock
