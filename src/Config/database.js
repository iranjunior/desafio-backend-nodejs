const mongoose = require("mongoose");
const { db_uri, env } = require("./vars");
if (env !== "production") mongoose.set("debug", true);

exports.connect = async () => {
  let connected = false;
  let trys = 0;
  while (!connected) {
    try {
      trys += 1;
      if (env === "test") console.log("Trying to connect with DB! Try: ", trys);
      await new Promise(done => setTimeout(done, 50));
      await mongoose.connect(db_uri, {
        useNewUrlParser: true,
        keepAlive: true,
        useCreateIndex: true
      });
      connected = true;
      if (env === "test") console.log("Connected with DB!!");
    } catch (error) {
      console.log(error);
    }
  }

  return mongoose.connection;
};
