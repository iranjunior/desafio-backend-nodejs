const User = require("../Models/users");
const Token = require("../../Utils/refreshToken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

class UserController {
  constructor() {
    this.store.bind();
    this.show.bind();
  }
  async store(request, response) {
    try {
      const { name, email, password, phones } = request.body;

      if (!validator.isEmail(email))
        return response
          .status(500)
          .json({
            mensage: "email invalido"
          })
          .send();

      const exists = await User.findOne({
        email
      });
      if (exists)
        return response
          .status(500)
          .json({
            mensage: "Usuario já cadastrado "
          })
          .send();

      if (name.length < 2 || name.length > 100)
        return response
          .status(500)
          .json({
            mensage: "Nome invalido !"
          })
          .send();
      if (password.length < 4)
        return response
          .status(500)
          .json({
            mensage: "Senha invalida !"
          })
          .send();

      const salts = bcrypt.genSaltSync();

      const password_hash = bcrypt.hashSync(password, salts);

      const last_login = Date.now();
      const token = Token.generate(last_login);

      const user = await User.create({
        name,
        email,
        password: password_hash,
        phones,
        last_login,
        token
      });

      return response
        .status(201)
        .json({
          uuid: user.uuid,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          last_login: user.last_login,
          token
        })
        .send();
    } catch (error) {
      return response
        .status(500)
        .json(error.msg)
        .send();
    }
  }
  async show(request, response) {
    try {
      const uuid = request.params.uuid;
      const user = await User.findOne({
        uuid
      });
      const [, token] = request.headers.authorization.split(" ");
      if (token !== user.token)
        return response
          .status(401)
          .json({
            message: "Não Autorizado"
          })
          .send();

      return response
        .status(200)
        .json(user)
        .send();
    } catch (error) {
      return response
        .status(500)
        .json(error)
        .send();
    }
  }
}

module.exports = new UserController();
