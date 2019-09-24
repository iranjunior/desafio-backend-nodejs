/* eslint-disable no-undef */
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
  sample: path.resolve(__dirname, "../../.env.example")
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  expired_time: process.env.EXPIRE_MINUTES,
  secret: process.env.APP_SECRET,
  db_uri:
    process.env.NODE_ENV === "development"
      ? process.env.DB_URI
      : process.env.DB_URI_TEST
};
