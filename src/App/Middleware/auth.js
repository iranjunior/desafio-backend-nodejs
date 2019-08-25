const jwt = require("jsonwebtoken");
const { secret } = require("../../Config/vars");
const auth = (request, reponse, next) => {
  const authorization = request.headers.authorization;

  if (!authorization)
    return reponse
      .status(401)
      .json({ message: "Sem Token de autenticação" })
      .send();

  const [, token] = authorization.split(" ");

  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return reponse
      .status(401)
      .json({
        message: "Token invalido"
      })
      .send();
  }
};
module.exports = auth;
