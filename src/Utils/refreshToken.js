const jwt = require('jsonwebtoken');
const { expired_time, secret } = require('../Config/vars');

const generate = (last_login) =>{
  return jwt.sign({
    exp: Math.floor(last_login / 1000) *60 * expired_time
  }, secret)

}
module.exports = {
    generate
}
