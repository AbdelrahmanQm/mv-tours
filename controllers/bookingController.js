const factory = require('./handlersFactory');
const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBookins = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);

exports.createBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.create(req.body);
  const user = await User.findById(req.body.user);
  if (user) {
    const userBookings = user.bookings;
    userBookings.push(booking._id);
    await User.findByIdAndUpdate(
      req.body.user,
      { bookings: userBookings },
      {
        new: true,
        runValidators: false,
      },
    );
  }
  res.status(200).json({
    status: 'success',
    data: booking,
  });
});
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
