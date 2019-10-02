const jwt = require("jsonwebtoken");
const { expired_time, secret } = require("../Config/vars");

const generateLocal = (last_login, expired_time) => {
    return jwt.sign(
        {
            exp: Math.floor(last_login / 1000) * 60 * expired_time
        },
        secret
    );
};

module.exports = {
    generate: last_login => generateLocal(last_login, expired_time),
    generateLocal
};
