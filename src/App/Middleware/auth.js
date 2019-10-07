const jwt = require('jsonwebtoken');
const { secret } = require('../../Config/vars');

const auth = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ message: 'Sem Token de autenticação' })
      .send();
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') return response.status(401).json({ message: 'Token Invalido' }).send();

  try {
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    return response
      .status(401)
      .json({
        message: 'Token invalido',
      })
      .send();
  }
};
module.exports = auth;
