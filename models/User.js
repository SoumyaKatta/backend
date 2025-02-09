"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
var mongoose_1 = require("mongoose");
var mongoose = require('../connection');
var userSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    password: String,
});
var User = mongoose.model('User', userSchema);
console.log('User model was created');
module.exports = User;
