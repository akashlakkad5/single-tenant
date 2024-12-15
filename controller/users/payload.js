const Joi = require('joi');


//register User validation

exports.registerUser = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).options({ allowUnknown: true });


//Login User validation
exports.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).options({ stripUnknown: true });

// Update Password
exports.updatePassword = Joi.object({
    user: Joi.string().required(),
    password: Joi.string().required(),
    cPassword: Joi.string().required(),
}).options({ stripUnknown: true });