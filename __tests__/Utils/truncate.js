const User = require('../../src/App/Models/users');
// const mongoose = require("mongoose");
module.exports = {
  user: async () => {
    await User.remove({});
  },
};
