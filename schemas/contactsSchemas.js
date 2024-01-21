import Joi from "joi";

export const createContactSchema = (data) => Joi.object().options({abortEarly: false})
    .keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required()
    }).validate(data)


export const updateContactSchema  = (data) => Joi.object().options({abortEarly: false})
.keys({
        name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string()
}).validate(data)