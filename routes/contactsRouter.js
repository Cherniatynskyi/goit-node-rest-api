import express from "express";
import { checkContactId, checkCreateContactData, checkUpdateContactData, checkUpdateStatusData } from "../middlewares/contactMiddleware.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id",checkContactId, getOneContact);

contactsRouter.delete("/:id",checkContactId, deleteContact);

contactsRouter.post("/",checkCreateContactData, createContact);

contactsRouter.put("/:id",checkContactId, checkUpdateContactData, updateContact);

contactsRouter.patch("/:id/favorite",checkContactId, checkUpdateStatusData, updateContact)

export default contactsRouter;
