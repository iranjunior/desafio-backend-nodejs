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

UserSchema.static('verifyPassword', async function(email, password){
    const [ user ] = await this.find({email}).select(['password'])

    const validate = await bcrypt.compare(password, user.password)

    return validate

});

UserSchema.static('loginUser', async function(email){
    const last_login = Date.now();

    const token = Token.generate(last_login)

    await this.updateOne({email}, {last_login, token})
    return await this.findOne({email}).select(['uuid', 'createdAt', 'updatedAt', 'last_login', 'token'])
})

UserSchema.static('checkUser', async function(email){
    try {
        const [ user ] = await this.find({email})
        return !!user
    } catch (error) {
        return false
    }
})


UserSchema.static('findForId', async function(uuid){
    try {
        const [ user ] = await this.find({uuid})
        return user
    } catch (error) {
        return false
    }
})



module.exports = model("User", UserSchema);
