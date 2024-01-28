import { createContactValidator, updateContactValidator } from "../schemas/contactsValidator.js";
import { User } from "../models/userModel.js";
import { userRoles } from "../constants/userRoles.js";

export const getAllContacts = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
};

export const getOneContact = async(req, res) => {
    const {id} = req.params
    const user = await User.findById(id)
    
    if(!user){
        res.status(404).json({
            msg: "Not Found",
        })
        return
    }
    res.status(200).json(user)
};

export const deleteContact = async(req, res) => {
    const {id} = req.params
    const deletedContact = await User.findByIdAndDelete(id)
    if(!deleteContact){
        res.status(404).json({
            msg: "Not Found",
        })
        return
    }
    res.status(200).json(deletedContact)
};

export const createContact = async(req, res) => {
    
    const newUser = await User.create(req.body)
    newUser.password = undefined

    if(!userRoles){
        res.status(404).json({
            msg: "Not Found",
        })
        return
    }
    res.status(201).json(newUser);
};


export const updateContact = async(req, res) => {
    const {id} = req.params
    // const {value, error} = updateContactValidator(req.body)

    const updatedContact = await User.findByIdAndUpdate(id, req.body, {new: true})
    

    res.status(200).json(updatedContact)
};


// if(error){
    //     res.status(400).json({
    //         msg: error.details[0].message
    //     })

    //     return
    // }
    
    // const body = value
    // const data = await editContact(id, body)
    // if(data === 'body error'){
    //     res.status(400).json({
    //         msg: "Body must have at least one field"
    //     })
    //     return
    // }

    // if(data === 'id error'){
    //     res.status(404).json({
    //         msg: "Not Found"
    //     })
    //     return
    // }