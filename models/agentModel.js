const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must provide a name for the agent/agency'],
  },
  operationCountries: [
    {
      type: String,
      requried: [true, 'You must provide a country'],
    },
  ],
  ratingsAverage: {
    type: Number,
    default: 4.7,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  tours: [{ type: mongoose.Schema.ObjectId, ref: 'Tour' }],
});

agentSchema.pre(/^find/, function (next) {
  this.populate('tours');
  next();
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
