const isEmail = require("validator/lib/isEmail");

module.exports = (name, email, password) => {
  const messages = [];

  if (!isEmail(email)) messages.push("Email invalido");
  if (name.length < 2 || name.length > 80) messages.push("Name invalido");
  if (password.length < 5)
    messages.push("O password deve ter ao menos 6 caracteres");
  return messages;
};
