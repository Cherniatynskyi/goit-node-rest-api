import express from "express";
import { checkLoginData, checkSignupData } from "../middlewares/authMiddleware.js";
import { login, signup } from "../controllers/authControllers.js";

const authRouter = express.Router()

export default authRouter;

authRouter.post( '/signup', checkSignupData, signup);
authRouter.post('/login', checkLoginData, login);