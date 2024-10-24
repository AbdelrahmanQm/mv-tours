const mongoose = require('mongoose');

/* 
Name
•⁠  ⁠⁠duration
•⁠  ⁠⁠overview
•⁠  ⁠⁠pickup time
•⁠  ⁠⁠max group size
•⁠  ⁠⁠tour type
•⁠  ⁠⁠rating Average
•⁠  ⁠⁠rating quantity
•⁠  ⁠⁠includes
•⁠  ⁠⁠excludes
•⁠  ⁠⁠features
•⁠  ⁠⁠rates: {
	[{
		nPerson,
		pricePerPerson
	}]
	}
•⁠  ⁠cover photo
•⁠  ⁠⁠photos
•⁠  ⁠⁠destinations
•⁠  ⁠⁠addOns: {[
	addon,
	price
	]}
•⁠  ⁠discription
•⁠  ⁠⁠Itinerary {[
	day,
	dayItinrary
	]}
*/

const tourShcema = new mongoose.Schema({
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
  destinations: [String],
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
});

// Middleware to set createAt
tourShcema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});
const Tour = mongoose.model('Tour', tourShcema);

module.exports = Tour;
