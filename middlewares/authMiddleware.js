import { signupUserValidator } from "../schemas/userValidator.js";
import { catchAsync } from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const checkSignupData = catchAsync(async(req, res, next) =>{
    const {value, error} = signupUserValidator(req.body);

    if(error){
        res.status(400).json({msg: 'Invalid data'})
        return
    }  

    const userExists = await User.exists({email: value.email})

    if(userExists){
        res.status(409).json({msg:'User already exists'})
        return
    } 

    const hashedPass = await bcrypt.hash(value.password, 10)
    req.body = {...value, password: hashedPass}

    next()
})


export const checkLoginData = catchAsync(async(req,res,next) =>{
    const {value, error} = signupUserValidator(req.body);

    if(error){
        res.status(400).json({msg: 'Invalid data'})
        return
    } 

    const user = await User.findOne({email: value.email})

    if(!user){
        res.status(401).json({msg:'Email or password invalid'})
        return
    } 
    
    const passwordIsValid = await bcrypt.compare(value.password, user.password)

    if(!passwordIsValid){
        res.status(401).json({msg:'Email or password invalid'})
        return
    }

    const payload = {id: user._id}
    const SECRET = process.env.SECRET_KEY
    const token = jwt.sign(payload, SECRET, {expiresIn: '23h'})
    
    req.body = {...value, token, id: user._id}
    console.log(req.body)
    next()
})


export const checkAuth = catchAsync(async (req, res, next) =>{
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(' ')
    if(bearer !== 'Bearer'){
        res.status(401).json({msg:'Unauthorized'})
        return
    }

    try {
        const SECRET = process.env.SECRET_KEY
        const {id} = jwt.verify(token, SECRET)
        const user = await User.findById(id)

        if(!user || !user.token || user.token !== token){
            res.status(401).json({msg:'Invalid Email or Password'})
        return
        }

        req.user = user
        next()
        
    } catch (error) {
        res.status(401).json({msg:'Invalid Email or Password'})
        return
    }

})