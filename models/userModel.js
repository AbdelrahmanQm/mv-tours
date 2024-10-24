const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    minlength: [8, 'Password cannot be shorter than 8 characters!'],
    required: [true, 'You must provide a password'],
    validate: {
      validator: function (cp) {
        return cp === this.password;
      },
      message: 'Password confirmation is incorrect!',
    },
    select: false,
  },
  profilePhoto: {
    type: String,
    default: 'Default user image',
  },
});

// Password Encryption (While creating user);
userSchema.pre('save', async function (next) {
  // Works only when password is modified
  if (!this.isModified('password')) return next();

  // Encrypting password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Comparing password to ecrypted password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
