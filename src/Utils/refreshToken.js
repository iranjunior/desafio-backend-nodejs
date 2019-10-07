const jwt = require('jsonwebtoken');
const { expiredTime, secret } = require('../Config/vars');

const generateLocal = (lastLogin, expired) => jwt.sign(
  {
    exp: Math.floor(lastLogin / 1000) * 60 * expired,
  },
  secret,
);

module.exports = {
  generate: (lastLogin) => generateLocal(lastLogin, expiredTime),
  generateLocal,
};
