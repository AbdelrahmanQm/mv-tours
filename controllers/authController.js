const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
// create user test

// Get All Users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'sucess',
    nDocs: users.length,
    data: users,
  });
});
// Create New User by admin
exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
