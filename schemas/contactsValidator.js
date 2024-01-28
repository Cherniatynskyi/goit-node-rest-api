import Joi from "joi";
import { userRoles } from "../constants/userRoles.js";
import { PASSWD_REGEX } from "../constants/regex.js";

export const createContactValidator = (data) => Joi.object().options({abortEarly: false})
    .keys({
            name: Joi.string().min(2).max(30).required(),
            email: Joi.string().email().required(),
            year: Joi.number().min(1900).max(new Date().getFullYear() - 12),
            password: Joi.string().regex(PASSWD_REGEX).required(),
            role: Joi.string().valid(...Object.values(userRoles))
    }).validate(data)


export const updateContactValidator = (data) => Joi.object().options({abortEarly: false})
.keys({
        name: Joi.string().min(2).max(30),
        year: Joi.number().min(1900).max(new Date().getFullYear() - 12),
        role: Joi.string().valid(...Object.values(userRoles))
}).validate(data)