/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema } from "mongoose"
const mongoose = require('../connection')
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
  });
  const User = mongoose.model('User', userSchema);
  console.log('User model was created');
  module.exports = User;