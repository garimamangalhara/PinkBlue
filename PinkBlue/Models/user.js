const mongoose = require('mongoose');

const express = require('express')
const app = express();


const UserSchema = new mongoose.Schema({
    name: String,
    userName: {type:String,unique:true},
    password: String,
    isManager: Boolean
});


module.exports.User = mongoose.model('User', UserSchema); 