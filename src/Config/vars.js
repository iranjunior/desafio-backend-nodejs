const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
  sample: path.resolve(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  expiredTime: process.env.EXPIRE_MINUTES,
  secret: process.env.APP_SECRET,
  dbURI:
    process.env.NODE_ENV === 'development'
      ? process.env.DB_URI
      : process.env.DB_URI_TEST,
};
