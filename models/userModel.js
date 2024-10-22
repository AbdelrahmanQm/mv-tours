const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name!'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email!'],
    unique: [true, 'Email is already in use'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'editor', 'guest', 'agent', 'guide', 'user'],
  },
  password: {
    type: String,
    minlength: [8, 'Password cannot be shorter than 8 characters!'],
    required: [true, 'You must provide a password'],
  },
  passwordConfirm: {
    type: String,
    minlength: [8, 'Password cannot be shorter than 8 characters!'],
    required: [true, 'You must provide a password'],
  },
  profilePhoto: {
    type: String,
    default: 'Default user image',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
