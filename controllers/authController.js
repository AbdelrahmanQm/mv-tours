const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const createToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// User Sign Up
exports.signup = catchAsync(async (req, res, next) => {
  const userInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photo: req.body.photo,
    role: 'user',
  };
  const user = await User.create(userInfo);
  // Creating User token
  const token = createToken(user._id);
  res.status(200).json({
    status: 'success',
    toke: token,
    data: user,
  });
});

// User Sign In
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('You must enter email and password'), 400);
  }
  // Check if the email is found
  const user = await User.findOne({ email: req.body.email }).select(
    '+password',
  );
  // check if the password is correct
  const correct = await user.correctPassword(password, user.password);
  // create an error if the info is incorrect
  if (!correct || !user) {
    return next(new AppError('Email or password is incorrect!'), 404);
  }
  // create Json Web Token
  const token = createToken(user._id);

  // removing user password from response
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token: token,
    data: user,
  });
});
// Get Self data
exports.getMe = 'getMe';
// User self Update
exports.updateMe = 'updateMe';
// User Forgot Password
exports.forgotUserPassword = 'forgotPassword';
// User Reset Password
exports.resetUserPassword = 'forgotPassword';
