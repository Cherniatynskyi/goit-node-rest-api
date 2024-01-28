import { Types } from "mongoose";
import { catchAsync } from "../utils/catchAsync.js";
import { createContactValidator, updateContactValidator } from "../schemas/contactsValidator.js";
import { User } from "../models/userModel.js";

export const checkCreateUserData = catchAsync(async (req, res, next) =>{
    const {value, error} = createContactValidator(req.body)
    if(error){
        res.status(400).json({
            msg: error.details[0].message
        })
        return
    }

    const userExists = await User.exists({email: value.email})

    if(userExists){
        res.status(409).json({
            msg: "User with this email already exists"
        })
    }

    req.body = value
    next()
})


export const checkUserId = catchAsync(async (req, res, next) => {
    const {id} = req.params

    const isIdValid = Types.ObjectId.isValid(id)

    if(!isIdValid){
        res.status(404).json({
            msg: "User not found"
        })
    }

    const userExists = await User.exists({_id: id})

    if(!userExists){
        res.status(404).json({
            msg: "User not found"
        })
    }
    next()
})

export const checkUpdateUserData = catchAsync(async (req, res, next) =>{
    const {value, error} = updateContactValidator(req.body)

    if(error){
        res.status(400).json({
            msg: error.details[0].message
        })
        return
    }

    req.body = value
    next()
})