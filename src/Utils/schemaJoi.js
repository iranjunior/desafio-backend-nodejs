const Joi = require('@hapi/joi');
const phones = Joi.object({
    ddd: Joi.string().required().pattern(/^0\d{2}$/),
    phone: Joi.string().required().pattern(/^[0-9]{8,11}$/)

})
const signUp = Joi.object({
    name: Joi.string().required().pattern(/^[a-zA-Z\s]{2,80}$/),
    email: Joi.string().required().email({minDomainSegments: 2 , tlds: {allow: ['com', 'net']}}),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9?!@#$%¨&*()_-]{8,20}$/),
    phones: Joi.array().items( phones )
});

const singIn = Joi.object({
    email: Joi.string().email({minDomainSegments: 2 , tlds: {allow: ['com', 'net']}}).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,20}%/)
});

module.exports = {
    signUp,
    singIn
}
