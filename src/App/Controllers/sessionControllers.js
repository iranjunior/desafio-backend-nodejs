const User = require("../Models/users");
const bcrypt = require("bcryptjs");
const Token = require("../../Utils/refreshToken");
class SessionControllers {
  constructor() {
    this.auth.bind();
  }

  async auth(request, reponse) {
    const { email, password } = request.body;
    let user = await User.findOne({
      email
    }).select(["uuid", "email", "password", "createdAt", "updatedAt"]);

    if (!user)
      return reponse
        .status(404)
        .json({
          menssage: "Usuario e/ou senha inválidos"
        })
        .send();

    const validate = await bcrypt.compare(password, user.password);
    if (!validate)
      return reponse
        .status(500)
        .json({
          menssage: "Usuario e/ou senha inválidos"
        })
        .send();

    const last_login = Date.now();

    const token = Token.generate(last_login);
    try {
      await User.updateOne(
        {
          uuid: user.uuid
        },
        {
          last_login,
          token
        }
      );
      user.token = token;
      user.last_login = last_login;
    } catch (error) {
      return reponse
        .status(500)
        .json(error)
        .send();
    }

    return reponse
      .status(200)
      .json({
        uuid: user.uuid,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        last_login: user.last_login,
        token
      })
      .send();
  }
}

module.exports = new SessionControllers();
