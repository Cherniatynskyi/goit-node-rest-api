import { ImageService } from "./imageService.js";
import { User } from "../models/userModel.js";
import { HttpError } from "../utils/httpError.js";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import fs from 'fs'


export const updateMe = async (userData, user, file) => {
    if (file) {
      user.avatarURL = await ImageService.saveImage(
        file,
        {
          maxFileSize: 2,
          width: 250,
          height: 250,
        },
        'avatars',
      );
    }
  
    Object.keys(userData).forEach((key) => {
      user[key] = userData[key];
    });
  
    return user.save();
  };


  export const restorePasswordService = async (otp, newPassword) => {
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
  
    const user = await User.findOne({
      passwordResetToken: otpHash,
      passwordResetTokenExp: { $gt: Date.now() },
    });
  
    if (!user) throw new HttpError(400, "Invalid token");
   
    const hashedPass = await bcrypt.hash(newPassword, 10)
    user.password = hashedPass;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExp = undefined;
  
    await user.save();
  };
  
  