const Joi = require("@hapi/joi")

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(6).max(255).required(),
        email: Joi.string().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6)
    })
    
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(6).max(255).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6)
    })
    
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
