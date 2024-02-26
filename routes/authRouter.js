import express from "express";
import { checkAuth, checkLoginData, checkSignupData, checkUpdateUserData, checkVerifyEmail, uploadAvatar} from "../middlewares/authMiddleware.js";
import { forgotPassword, getCurrent, login, logout, resendVerifyEmail, restorePassword, signup, updateAvatar, updateUser, verifyEmail } from "../controllers/authControllers.js";

const authRouter = express.Router()

export default authRouter;

authRouter.post( '/register', checkSignupData, signup);

authRouter.get('/verify/:verificationCode', verifyEmail)

authRouter.post('/verify', checkVerifyEmail, resendVerifyEmail)

authRouter.post('/login', checkLoginData, login);

authRouter.get('/current', checkAuth, getCurrent)

authRouter.post('/logout', checkAuth, logout)

authRouter.patch('/', checkAuth, checkUpdateUserData, updateUser)

authRouter.patch('/avatars', checkAuth, uploadAvatar, updateAvatar)

authRouter.post('/forgot-password', forgotPassword);

authRouter.post('/restore-password/:otp', restorePassword);