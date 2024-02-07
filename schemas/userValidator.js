import Joi from "joi";
import {userSubscriptions} from '../constants/userSubscriptions.js'

export const signupUserValidator = (data) => Joi.object().options({abortEarly: false})
    .keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(32).required(),
    }).validate(data)

export const updateSubscriptionValidator = (data) => Joi.object().options({abortEarly: false})
    .keys({
            subscription: Joi.string().valid(...Object.values(userSubscriptions)).required()
    }).validate(data)