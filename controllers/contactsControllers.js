import { Contact } from "../models/contactModel.js";

export const getAllContacts = async (req, res) => {
    const {_id: owner} = req.user
    const {page=1, limit=10, favorite} = req.query
    const skip = (page-1) * limit
    const findQuery = favorite ? {owner, favorite:favorite} : {owner}

    const contacts = await Contact.find(findQuery, "" ,{skip, limit}).populate("owner", "email")
    res.status(200).json(contacts)
};

export const getOneContact = async(req, res) => {
    const {id} = req.params
    const {_id: owner} = req.user
    console.log(id)
    const contact = await Contact.find({_id: id, owner})
    if(contact.length === 0){
        res.status(404).json({
            message: "Not Found",
        })
        return
    }
    res.status(200).json(contact)
};

export const deleteContact = async(req, res) => {
    const {id} = req.params
    const {_id: owner} = req.user
    const deletedContact = await Contact.findOneAndDelete({_id: id, owner})
    if(!deletedContact){
        res.status(404).json({
            message: "Not Found",
        })
        return
    }
    res.status(200).json(deletedContact)
};

export const createContact = async(req, res) => {
    const {_id: owner} = req.user
    const newContact = await Contact.create({...req.body, owner})

    if(!newContact){
        res.status(404).json({
            message: "Not Found",
        })
        return
    }
    res.status(201).json(newContact);
};


export const updateContact = async(req, res) => {
    const {id} = req.params
    const {_id: owner} = req.user

    const updatedContact = await Contact.findOneAndUpdate({_id:id, owner}, req.body, {new: true})
    if(!updatedContact){
        res.status(404).json({
            message: "Not Found",
        })
        return
    }
    res.status(200).json(updatedContact)
};


