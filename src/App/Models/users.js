const uuid = require("short-uuid");
const bcrypt = require("bcryptjs");
const Token = require("../../Utils/refreshToken");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true
    },
    name:{
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phones: [
        {
            ddd: {
                type: String,
                required: true
              },
             phone: {
                 type: String,
                 required: true
             }
    }],
    password: {
      type: String,
      required: true,
      select: false
    },
    last_login: {
      type: Date,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('validate', async function(next){

    this.uuid = await uuid.generate();
    this.last_login = Date.now();

    this.token = Token.generate(this.last_login);
    next();

})

UserSchema.pre('save', async function(next) {
    const salts = bcrypt.genSaltSync();

    this.password = await bcrypt.hashSync(this.password, salts);

    next();
})
module.exports = model("User", UserSchema);
