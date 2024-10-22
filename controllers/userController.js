const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./handlersFactory');

// Get All Users
exports.getAllUsers = factory.getAll(User);
// Create New User by admin
exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
