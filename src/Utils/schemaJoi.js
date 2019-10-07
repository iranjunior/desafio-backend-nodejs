const Joi = require('@hapi/joi');

const phones = Joi.object({
  ddd: Joi.string()
    .required()
    .pattern(/^0\d{2}$/),
  phone: Joi.string()
    .required()
    .pattern(/^[0-9]{8,11}$/),
});
const signUp = Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^[a-zA-Z\s.]{2,80}$/),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9?!@#$%¨&*()_-]{8,20}$/),
  phones: Joi.array().items(phones),
});

const singIn = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9?!@#$%¨&*()_-]{8,20}$/),
});
const update = Joi.object({
  name: Joi.string()
    .optional()
    .regex(/^[a-zA-Z\s.]{2,80}$/),
  email: Joi.string()
    .optional()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .optional()
    .regex(/^[a-zA-Z0-9?!@#$%*()_-]{8,20}$/),
  phones: Joi.array()
    .optional()
    .items(phones),
});
module.exports = {
  signUp,
  singIn,
  update,
};
