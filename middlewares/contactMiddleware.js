import { Types } from "mongoose";
import { catchAsync } from "../utils/catchAsync.js";
import { createContactValidator, updateContactValidator, updateStatusValidator } from "../schemas/contactsValidator.js";
import { Contact } from "../models/contactModel.js";

export const checkCreateContactData = catchAsync(async (req, res, next) =>{
    const {value, error} = createContactValidator(req.body)
    if(error){
        res.status(400).json({
            msg: error.details[0].message
        })
        return
    }

    const contactExists = await Contact.exists({email: value.email})

    if(contactExists){
        res.status(409).json({
            msg: "User with this email already exists"
        })
        return
    }

    req.body = value
    next()
})


export const checkContactId = catchAsync(async (req, res, next) => {
    const {id} = req.params

    const isIdValid = Types.ObjectId.isValid(id)

    if(!isIdValid){
        res.status(404).json({
            msg: "User not found"
        })
    }

    const contactExists = await Contact.exists({_id: id})

    if(!contactExists){
        res.status(404).json({
            msg: "User not found"
        })
    }
    next()
})

export const checkUpdateContactData = catchAsync(async (req, res, next) =>{
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

export const checkUpdateStatusData = catchAsync(async (req, res, next) =>{
    const {value, error} = updateStatusValidator(req.body)

    if(error){
        res.status(400).json({
            msg: error.details[0].message
        })
        return
    }

    req.body = value
    next()
})