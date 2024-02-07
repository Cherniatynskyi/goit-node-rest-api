import express from "express";
import { checkContactId, checkCreateContactData, checkUpdateContactData, checkUpdateStatusData } from "../middlewares/contactMiddleware.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

import { checkAuth } from "../middlewares/authMiddleware.js";

const contactsRouter = express.Router();

contactsRouter.get("/", checkAuth, getAllContacts);

contactsRouter.get("/:id", checkAuth, checkContactId, getOneContact);

contactsRouter.delete("/:id",checkAuth, checkContactId, deleteContact);

contactsRouter.post("/",checkAuth, checkCreateContactData, createContact);

contactsRouter.put("/:id", checkAuth, checkContactId, checkUpdateContactData, updateContact);

contactsRouter.patch("/:id/favorite", checkAuth, checkContactId, checkUpdateStatusData, updateContact)


export default contactsRouter;
