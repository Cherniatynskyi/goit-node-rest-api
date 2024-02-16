import { catchAsync } from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";

export const signup = catchAsync(async(req, res) => {
    const newUser = await User.create(req.body)
    const {email, subscription} = newUser

    res.status(201).json({user: {email, subscription}})
})

export const login = catchAsync(async(req, res) => {
    const {token, user} = req.body
    const {_id, email, subscription} = user
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

