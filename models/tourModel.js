const mongoose = require('mongoose');

const tourShcema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: [true, 'The name of the tour is already in use'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have duration'],
    },
    createdAt: Date,
    overview: {
      type: String,
      required: [true, 'A tour must have an overview'],
    },
    description: {
      type: String,
      required: [true, 'A tour must have a description'],
    },
    pickupTime: {
      type: String,
    },
    maxGroupSize: {
      type: Number,
    },
    tourType: {
      type: String,
      required: [true, 'A tour must have a type either day or package'],
      enum: ['day', 'package'],
    },
    tourStyle: {
      type: String,
      required: [true, 'A tour must have a style'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    includes: {
      type: [String],
    },
    exculdes: {
      type: [String],
    },
    features: {
      type: [String],
    },
    rates: [
      {
        nPerson: {
          type: Number,
          required: [true, 'You must provide a number or persons'],
        },
        pricePerPerson: {
          type: Number,
          required: [true, ' You must provide a price per person'],
        },
      },
    ],
    coverPhoto: {
      type: String,
      default: 'default tour cover image',
    },
    photos: [String],
    locations: [String],
    addOns: [
      {
        addOn: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    itinrary: [
      {
        day: Number,
        itinrary: String,
      },
    ],
    agent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Agent',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Populating agent before find
tourShcema.pre(/^find/, function (next) {
  this.populate({
    path: 'agent',
    select: '-tours',
  });
  next();
});

// Middleware to set createAt
tourShcema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});
const Tour = mongoose.model('Tour', tourShcema);

module.exports = Tour;
