const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const createToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// User Sign Up /signup
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
  req.user = user;
  // Creating User token
  const token = createToken(user._id);
  res.status(200).json({
    status: 'success',
    toke: token,
    data: user,
  });
});

// User Sign In /signin
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
// Get Self data /me
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
// User self Update
exports.updateMe = 'updateMe';

/* MiddleWares */

// Protect: middleware that protects certain routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // check if a Bearer token is found in req.headers.authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // ex: Bearer 76ys2338732hds
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You must login to visit this link'), 401);
  }
  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // check if the user exist
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError('User does not exist!', 401));
  }
  //Store the user in the request Object to be used from anyware
  req.user = user;
  next();
});

// RestricktTo: Used to restrick certain routes to certain users by role ['user','admin','guide','agent','editor']

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles are added as arguments (ex: restricktTo('admin','editor'))
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not allowed to perform this action!', 403),
      );
    }
    next();
  };

// Forgot password Route handler

exports.forgotUserPassword = catchAsync(async (req, res, next) => {
  // Search for user in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with this email', 401));
  }
  // create a password reset token that works for 10 minutes
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // Temperorly sending the reset token as a res.json() and later will be sent by email
  res.status(200).json({
    status: 'success',
    resetToken: resetToken,
  });
});

// Reset Password Route Handler
exports.resetPassword = catchAsync(async (req, res, next) => {
  console.log(req.params);
  //1) Get the user by token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresIn: { $gt: Date.now() },
  });
  console.log(hashedToken);
  if (!user) {
    return next(
      new AppError('Password reset code is either invalid or expired!', 400),
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpiresIn = undefined;
  await user.save();
  res.status(200).json({
    status: 'success',
    message: 'Password has been updated!',
  });
  //2)
  //3)
  //4)
});
