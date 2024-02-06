import express from "express";
import { checkAuth, checkLoginData, checkSignupData} from "../middlewares/authMiddleware.js";
import { getCurrent, login, logout, signup } from "../controllers/authControllers.js";

const authRouter = express.Router()

export default authRouter;

authRouter.post( '/signup', checkSignupData, signup);

authRouter.post('/login', checkLoginData, login);

authRouter.get('/current', checkAuth, getCurrent)

authRouter.post('/logout', checkAuth, logout)