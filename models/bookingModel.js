const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'You need to select a tour!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User not found!'],
  },
  startDate: {
    type: Date,
    required: [true, 'You must provide a starting date'],
  },
  nPersons: {
    type: Number,
    required: [true, 'You must provide the number of persons!'],
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
