const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A location must have a name'],
    unique: [true, 'This location already exists!'],
  },
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  description: String,
  tags: [String],
  city: {
    type: String,
    required: [true, 'A location city must be provided!'],
  },
  country: {
    type: String,
    required: [true, 'A location country must be provided!'],
  },
  photos: [String],
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
