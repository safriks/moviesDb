const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: {type: String },
  })

const User = mongoose.model('Users', userSchema);

module.exports = User;

/*
const User = require("../models/Users");
*/
