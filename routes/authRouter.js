import express from "express";
import { checkAuth, checkLoginData, checkSignupData, checkUpdateUserData, uploadAvatar} from "../middlewares/authMiddleware.js";
import { forgotPassword, getCurrent, login, logout, restorePassword, signup, updateAvatar, updateUser } from "../controllers/authControllers.js";

const authRouter = express.Router()

export default authRouter;

authRouter.post( '/register', checkSignupData, signup);

authRouter.post('/login', checkLoginData, login);

authRouter.get('/current', checkAuth, getCurrent)

authRouter.post('/logout', checkAuth, logout)

authRouter.patch('/', checkAuth, checkUpdateUserData, updateUser)

authRouter.patch('/avatars', checkAuth, uploadAvatar, updateAvatar)

authRouter.post('/forgot-password', forgotPassword);

authRouter.post('/restore-password/:otp', restorePassword);