const User = require("../Models/users");


class UserController {
  constructor() {
    this.store.bind();
    this.show.bind();
  }
  async store(request, response) {
    try {
      const { name, email, password, phones } = request.body;

      const exists = await User.findOne({
        email
      });
      if (exists)
        return response
          .status(403)
          .json({
            message: "Usuario já cadastrado "
          })
          .send();



      const user = await User.create({
        name,
        email,
        password,
        phones
      });

      return response
        .status(201)
        .json({
          uuid: user.uuid,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          last_login: user.last_login,
          token: user.token
        })
        .send();
    } catch (error) {
      return response
        .status(500)
        .json({error})
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
