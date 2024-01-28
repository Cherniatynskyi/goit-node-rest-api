import express from "express";
import { checkCreateUserData, checkUpdateUserData, checkUserId } from "../middlewares/userMiddleware.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id",checkUserId, getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/",checkCreateUserData, createContact);

contactsRouter.put("/:id",checkUpdateUserData, updateContact);

export default contactsRouter;
