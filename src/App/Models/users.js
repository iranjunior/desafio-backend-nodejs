const uuid = require("short-uuid");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
      default: uuid.generate()
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phones: [
      {
        type: String,
        unique: true
      }
    ],
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
module.exports = model("User", UserSchema);
