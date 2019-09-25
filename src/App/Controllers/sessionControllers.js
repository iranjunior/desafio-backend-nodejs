const User = require("../Models/users");
const Token = require("../../Utils/refreshToken");
class SessionControllers {
  constructor() {
    this.auth.bind();
  }

  async auth(request, response) {
    const { email, password } = request.body;
    let user = await User.findOne({
      email
    }).select(["uuid", "email", "password", "createdAt", "updatedAt"]);

    if (!user)
      return response
        .status(404)
        .json({
          message: "Usuario e/ou senha inválidos"
        })
        .send();

    const validate = await User.verifyPassword(email, password);

    if (!validate)
      return response
        .status(404)
        .json({
          message: "Usuario e/ou senha inválidos"
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
      return response
        .status(500)
        .json(error)
        .send();
    }

    return response
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
