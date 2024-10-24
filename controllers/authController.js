const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

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
// User Forgot Password
exports.forgotUserPassword = 'forgotPassword';
// User Reset Password
exports.resetUserPassword = 'forgotPassword';

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
