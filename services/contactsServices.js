import {promises as fs} from 'fs'
import * as path from 'path';
import { v4 } from 'uuid';

const contactsPath = path.join('db', 'contacts.json');

async function parseData(){
    try {
      const readResult = await fs.readFile(contactsPath)
      return  JSON.parse(readResult)
    } catch (error) {
      console.log(error)
    }
  }


export async function contactsList(){
    try {
        var data = await parseData()
        return data
      }
       catch (error) {
        console.log(error)
      }
};


export async function getContactById(contactId){
    try {
        const data = await parseData()
        const result = data.find(contact => contact.id === contactId)
        if(!result){
          return false
        }
    return result
    }
    catch (error) {
        console.log(error)
    }
};


export async function removeContact(contactId) {
  const data = await parseData()
  const deletedContact = data.find(contact => contact.id === contactId)

  if(!deletedContact){
    return false
  }

  const result = data.filter(contact => contact.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(result))

  return deletedContact
}


export async function addContact({name, email, phone}) {
  const data = await parseData()
  const addedContact = {id: v4(), name, email, phone}
  data.push(addedContact)
  await fs.writeFile(contactsPath, JSON.stringify(data))

  return addedContact
}

export async function editContact(ID, body){

    if(Object.keys(body).length === 0){
      return 'body error'
    }

    const {name, email, phone} = body
    const data = await parseData()
    const contactToUpdate = data.find(contact => contact.id === ID)
    
    if(!contactToUpdate){
      return 'id error'
    }

    const index = data.indexOf(contactToUpdate)
    data[index] = {
      id: ID,
      name: name ? name : contactToUpdate.name,
      email: email ? email : contactToUpdate.email,
      phone: phone ? phone : contactToUpdate.phone
    }
    await fs.writeFile(contactsPath, JSON.stringify(data))
    return data[index]
}


