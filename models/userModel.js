import {Schema, model} from "mongoose";
import crypto from 'crypto';

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },{
    versionKey: false
})

userSchema.pre('save', async function(next) {
  if(this.isNew){
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex')

    this.avatarURL = (`https://gravatar.com/avatar/${emailHash}.jpg?d=robohash`)

    next();
  }
})

const User = model('User', userSchema)
export {User}