const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'You need to select a tour!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  firstName: {
    type: String,
    required: [true, 'You must provide your first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'You must provide your last name!'],
  },
  email: {
    type: String,
    required: [true, 'You must provide your email address!'],
    validate: {
      validator: validator.isEmail,
      message: 'Email address is invalid!',
    },
  },
  phone: {
    type: String,
    required: [true, 'You must provide a phone number!'],
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: [true, 'You must provide a starting date'],
  },
  nPersons: {
    type: Number,
    required: [true, 'You must provide the number of persons!'],
  },
  payedAmount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['cancelation requester', 'canceled', 'eligible', 'done'],
    default: 'eligible',
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('tour').populate('user');
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
