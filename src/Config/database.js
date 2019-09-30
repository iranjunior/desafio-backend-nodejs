const mongoose = require('mongoose');
const { dbURI, env } = require('./vars');

if (env !== 'production') mongoose.set('debug', true);

exports.connect = async () => {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    keepAlive: true,
    useCreateIndex: true,
  });

  return mongoose.connection;
};
