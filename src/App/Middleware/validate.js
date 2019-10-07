const schema = require('../../Utils/schemaJoi');

const signUp = async (request, response, next) => {
  const {
    name, email, password, phones,
  } = request.body;
  try {
    const { error } = await schema.signUp.validateAsync({
      name, email, password, phones,
    });
    if (!error) { return next(); }

    return response.status(400).json({ error }).send();
  } catch (error) {
    return response.status(400).json({ error }).send();
  }
};

const signIn = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    const { error } = await schema.singIn.validateAsync({ email, password });

    if (!error) { return next(); }
    return response.status(400).json({ error }).send();
  } catch (err) {
    return response.status(400).json({ err }).send();
  }
};

const update = async (request, response, next) => {
  const {
    name, email, password, phones,
  } = request.body;

  try {
    const { error } = await schema.update.validateAsync({
      name, email, password, phones,
    });

    if (!error) { return next(); }
    return response.status(400).json({ error }).send();
  } catch (error) {
    return response.status(400).json({ error }).send();
  }
};
module.exports = {
  signUp,
  signIn,
  update,
};
