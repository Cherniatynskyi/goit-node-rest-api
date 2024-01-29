import Joi from "joi";

export const createContactValidator = (data) => Joi.object().options({abortEarly: false})
    .keys({
            name: Joi.string().min(2).max(30).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(4).max(16).required()
    }).validate(data)


export const updateContactValidator = (data) => Joi.object().options({abortEarly: false})
.keys({
        name: Joi.string().min(2).max(30),
        email: Joi.string().email(),
        phone: Joi.string().min(4).max(16),
}).validate(data)


export const updateStatusValidator = (data) => Joi.object().options({abortEarly: false})
.keys({
        favorite: Joi.boolean().required()
}).validate(data)