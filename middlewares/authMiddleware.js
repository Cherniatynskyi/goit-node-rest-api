import { signupUserValidator, updateSubscriptionValidator } from "../schemas/userValidator.js";
import { catchAsync } from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";
import { ImageService } from "../services/imageService.js";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'





export const checkSignupData = catchAsync(async(req, res, next) =>{
    const {value, error} = signupUserValidator(req.body);

    if(error){
        res.status(400).json({message: error.details[0].message})
        return
    }  

    const userExists = await User.exists({email: value.email})

    if(userExists){
        res.status(409).json({message:'Email in use'})
        return
    } 

    const hashedPass = await bcrypt.hash(value.password, 10)
    req.body = {...value, password: hashedPass}

    next()
})


export const checkLoginData = catchAsync(async(req,res,next) =>{
    const {value, error} = signupUserValidator(req.body);

    if(error){
        res.status(400).json({message: error.details[0].message})
        return
    } 

    const user = await User.findOne({email: value.email})

    if(!user){
        res.status(401).json({message:'Email or password invalid'})
        return
    } 
    
    const passwordIsValid = await bcrypt.compare(value.password, user.password)

    if(!passwordIsValid){
        res.status(401).json({message:'Email or password invalid'})
        return
    }

    const payload = {id: user._id}
    const SECRET = process.env.SECRET_KEY
    const token = jwt.sign(payload, SECRET, {expiresIn: '23h'})
    
    req.body = {...value, token, user}
    next()
})


export const checkAuth = catchAsync(async (req, res, next) =>{
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(' ')
    if(bearer !== 'Bearer'){
        res.status(401).json({message:'Not authorized'})
        return
    }

    try {
        const SECRET = process.env.SECRET_KEY
        const {id} = jwt.verify(token, SECRET)
        const user = await User.findById(id)

        if(!user || !user.token || user.token !== token){
            res.status(401).json({message:'Not authorized'})
        return
        }

        req.user = user
        next()
        
    } catch (error) {
        res.status(401).json({message:'Not authorized'})
        return
    }

})


export const checkUpdateUserData = catchAsync(async (req, res, next) =>{
    const {value, error} = updateSubscriptionValidator(req.body)

    if(error){
        res.status(400).json({
            message: error.details[0].message
        })
        return
    }

    req.body = value
    next()
})



export const uploadAvatar = ImageService.initUploadImageMiddleware('avatarURL')