const UserModel = require('../Models/users');

const authLocal = async (request, response, User) => {
  try {
    const { email, password } = request.body;
    const userCheck = await User.checkUser(email);

    if (!userCheck) {
      return response
        .status(404)
        .json({
          message: 'Usuario e/ou senha inválidos',
        })
        .send();
    }

    const validate = await User.verifyPassword(email, password);

    if (!validate) {
      return response
        .status(404)
        .json({
          message: 'Usuario e/ou senha inválidos',
        })
        .send();
    }

    const user = await User.loginUser(email);

    return response.status(200).json({ user }).send();
  } catch (error) {
    return response.status(500).json({ error }).send();
  }
};

module.exports = {
  auth: (request, response) => authLocal(request, response, UserModel),
  authLocal,

};
