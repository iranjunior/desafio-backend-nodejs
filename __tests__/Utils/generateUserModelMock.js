const faker = require('faker');
const Regenx = require('randexp');

const UserModelMock = () => {
  const userDontExists = {
    checkUser: () => new Promise((resolve) => {
      setTimeout(resolve(false), 100);
    }),
  };

  const userExists = {
    checkUser: () => new Promise((resolve) => {
      setTimeout(resolve(true), 100);
    }),
  };
  const passwordIncorret = {
    verifyPassword: () => new Promise((resolve) => {
      setTimeout(resolve(false), 100);
    }),
  };
  const passwordCorrect = {
    verifyPassword: () => new Promise((resolve) => {
      setTimeout(resolve(true), 100);
    }),
  };

  const problemLogin = {
    loginUser: () => new Promise((resolve, reject) => {
      setTimeout(reject(new Error({ message: 'Ocorreu um erro no Banco de dados' })), 100);
    }),
  };
  const problemDatabase = {
    checkUser: () => new Promise((resolve, reject) => {
      setTimeout(reject(new Error({ message: 'Ocorreu um erro no Banco de dados' })), 100);
    }),
  };
  const createUser = {
    create: () => new Promise((resolve) => {
      setTimeout(resolve({
        uuid: faker.random.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        last_login: new Date(),
        token: new Regenx(/ .+/).gen(),
      }), 100);
    }),
  };
  const loginSuccess = {
    loginUser: () => new Promise((resolve) => {
      setTimeout(resolve({
        uuid: faker.random.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        last_login: new Date(),
        token: new Regenx(/ .+/).gen(),
      }), 100);
    }),
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

  };
};

module.exports = UserModelMock;
