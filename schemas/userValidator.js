import Joi from "joi";

export const signupUserValidator = (data) => Joi.object().options({abortEarly: false})
    .keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(32).required(),
    }).validate(data)