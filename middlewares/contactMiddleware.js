import { Types } from "mongoose";
import { catchAsync } from "../utils/catchAsync.js";
import { createContactValidator, updateContactValidator, updateStatusValidator } from "../schemas/contactsValidator.js";
import { Contact } from "../models/contactModel.js";

export const checkCreateContactData = catchAsync(async (req, res, next) =>{
    const {value, error} = createContactValidator(req.body)
    const {_id: owner} = req.user
    if(error){
        res.status(400).json({
            message: error.details[0].message
        })
        return
    }

    const contactExists = await Contact.exists({email: value.email, owner})

    if(contactExists){
        res.status(409).json({
            message: "Contact with this email already exists"
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
        res.status(400).json({
            message: "Invalid id"
        })
        return
    }

    const contactExists = await Contact.exists({_id: id})

    if(!contactExists){
        res.status(404).json({
            message: "Not found"
        })
        return
    }
    next()
})

export const checkUpdateContactData = catchAsync(async (req, res, next) =>{
    const {value, error} = updateContactValidator(req.body)

    if(error){
        res.status(400).json({
            message: error.details[0].message
        })
        return
    }

    if(Object.keys(value).length === 0){
        res.status(400).json({
            message: "Body must have at least one field"
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
            message: error.details[0].message
        })
        return
    }

    req.body = value
    next()
})

