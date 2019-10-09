const UUID = require('short-uuid');
const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');
const Token = require('../../Utils/refreshToken');

const UserSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phones: [
      {
        ddd: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
      },
    ],
    password: {
      type: String,
      required: true,
      select: false,
    },
    lastLogin: {
      type: Date,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('validate', async function (next) {
  this.uuid = await UUID().generate();
  this.lastLogin = Date.now();

  this.token = Token.generate(this.lastLogin);
  next();
});

UserSchema.pre('save', async function (next) {
  const salts = bcrypt.genSaltSync();

  this.password = await bcrypt.hashSync(this.password, salts);

  next();
});

UserSchema.static('verifyPassword', async function (email, password) {
  const [user] = await this.find({ email }).select(['password']);

  const validate = await bcrypt.compare(password, user.password);

  return validate;
});

UserSchema.static('loginUser', async function (email) {
  const lastLogin = Date.now();

  const token = Token.generate(lastLogin);

  await this.updateOne({ email }, { lastLogin, token });
  const user = await this.findOne({ email }).select([
    'uuid',
    'createdAt',
    'updatedAt',
    'lastLogin',
    'token',
  ]);

  return user;
});

UserSchema.static('checkUser', async function (email) {
  try {
    const [user] = await this.find({ email });
    return !!user;
  } catch (error) {
    return false;
  }
});

UserSchema.static('findForId', async function (uuid) {
  try {
    const [user] = await this.find({ uuid });
    return user;
  } catch (error) {
    return false;
  }
});

module.exports = model('User', UserSchema);
