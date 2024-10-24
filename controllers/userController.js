const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const factory = require('./handlersFactory');

/* Available for admins only */

// Get one user
exports.getUser = factory.getOne(User);
// Get All Users
exports.getAllUsers = factory.getAll(User);
// Create New User by admin
exports.createUser = factory.createOne(User);
// Update user using ID (passed in params)
exports.updateUser = factory.updateOne(User);
// Delete user
exports.deleteUser = factory.deleteOne(User);
