import { catchAsync } from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";

export const signup = catchAsync(async(req, res) => {
    const newUser = await User.create(req.body)

    res.status(201).json(newUser)
})

export const login = catchAsync(async(req, res) => {
    res.status(201).json({token: req.body.token})
})