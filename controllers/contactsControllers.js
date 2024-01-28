import {contactsList, getContactById, removeContact, addContact, editContact} from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
    const data = await contactsList()
    res.status(200).json(data)
};

export const getOneContact = async(req, res) => {
    const {id} = req.params
    const data = await getContactById(id)
    if(!data){
        res.status(404).json({
            msg: "Not Found",
        })
        return
    }
    res.status(200).json(data)
};

export const deleteContact = async(req, res) => {
    const {id} = req.params
    const data = await removeContact(id)
    if(!data){
        res.status(404).json({
            msg: "Not Found",
        })
        return
    }
    res.status(200).json(data)
};

export const createContact = async(req, res) => {
    const {value, error} = createContactSchema(req.body)
    if(error){
        res.status(400).json({
            msg: error.details[0].message
        })

        return
    }
    const data = await addContact(value)

    if(!data){
        res.status(404).json({
            msg: "Not Found",
        })
        return
    }
    res.status(201).json(data);
};


export const updateContact = async(req, res) => {
    const {id} = req.params
    const {value, error} = updateContactSchema(req.body)

    if(error){
        res.status(400).json({
            msg: error.details[0].message
        })

        return
    }
    
    const body = value
    const data = await editContact(id, body)
    if(data === 'body error'){
        res.status(400).json({
            msg: "Body must have at least one field"
        })
        return
    }

    if(data === 'id error'){
        res.status(404).json({
            msg: "Not Found"
        })
        return
    }

    res.status(200).json(data)
};
