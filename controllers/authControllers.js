import { catchAsync } from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";

export const signup = catchAsync(async(req, res) => {
    const newUser = await User.create(req.body)

    res.status(201).json(newUser)
})

export const login = catchAsync(async(req, res) => {
    const {token, id} = req.body
    await User.findByIdAndUpdate(id, {token})
    res.status(201).json({token})
})

export const getCurrent = catchAsync(async(req, res) => {
    const {email} = req.user
    res.status(201).json({email})
})

export const logout = catchAsync(async(req, res) =>{
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {token: null})

    res.status(200).json({msg: 'logout'})
})