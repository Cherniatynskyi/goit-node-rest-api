import { catchAsync } from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";
import { updateMe } from "../services/userService.js";
import { restorePasswordService } from "../services/userService.js";
import { sendEmail } from "../services/emailService.js";

export const signup = catchAsync(async(req, res) => {
    const newUser = await User.create(req.body)
    const {email, subscription, verificationCode} = newUser

    const verifyEmail = {
        to: email, subject: "Verify email",
        html: `<a traget="_blank" href="${process.env.BASE_URL}/api/users/verify/${verificationCode}">Verify</a>`
    }

    await sendEmail(verifyEmail)

    res.status(201).json({user: {email, subscription}})
})

export const verifyEmail  = catchAsync(async(req, res) =>{
    const {verificationCode} = req.params
    const user = await User.findOne({verificationCode})

    if(!user){
        res.status(404).json({message: "User not found"})
        return
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ''})

    res.status(200).json({message: "Verification successful"})
})


export const resendVerifyEmail  = catchAsync(async(req, res) =>{
    const {email} = req.body
    const {verificationCode, _id} = req.user

    const verifyEmail = {
        to: email, subject: "Verify email",
        html: `<a traget="_blank" href="${process.env.BASE_URL}/api/users/verify/${verificationCode}">Verify</a>`
    }

    await sendEmail(verifyEmail)

    res.status(200).json({message: "Verification email sent"})
})


export const login = catchAsync(async(req, res) => {
    const {token, user} = req.body
    const {_id, email, subscription} = user

    if(!user.verify){
        res.status(401).json({message: "Not authorized"})
        return 
    }
    await User.findByIdAndUpdate(_id, {token})
    res.status(200).json({token, user:{email, subscription}})
})

export const getCurrent = catchAsync(async(req, res) => {
    const {email, subscription} = req.user
    res.status(200).json({email, subscription})
})

export const logout = catchAsync(async(req, res) =>{
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {token: null})

    res.sendStatus(204)
})

export const updateUser = catchAsync(async(req, res) =>{
    const {_id} = req.user

    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {new: true})
    const {email, subscription} = updatedUser
    res.status(200).json({email, subscription})
})

export const updateAvatar = catchAsync(async(req, res) => {
    const {body, file, user} = req
    if(!file){
        res.status(400).json({
            message: "Bad request"
         })
    }
    const updatedUser = await updateMe(body, user, file)
    res.status(200).json({
       avatarURL: updatedUser.avatarURL
    })
})


export const forgotPassword = catchAsync(async (req, res) =>{
    const {email} = req.body
    console.log(email)
    const user = await User.findOne({email})
    if(!user) return res.status(200).json({message: 'Password resent sent by email'})

    const otp = user.createPasswordResetToken()

    await user.save()

    console.log(otp)

    user.passwordResetToken = undefined
    user.passwordResetTokenExp = undefined

    res.status(200).json({message: 'Password resent sent by email'})
})


export const restorePassword = catchAsync(async (req, res) =>{
    await restorePasswordService(req.params.otp, req.body.password)

    res.status(200).json({
        message: 'Password has been restored',
      });

})