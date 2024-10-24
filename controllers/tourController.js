const factory = require('./handlersFactory');
const Tour = require('../models/tourModel');

exports.createTour = factory.createOne(Tour);
exports.getTour = factory.getOne(Tour);
exports.getAllTours = factory.getAll(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
