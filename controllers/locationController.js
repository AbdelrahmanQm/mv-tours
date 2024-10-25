const Location = require('../models/locationModel');
const factory = require('./handlersFactory');

exports.createLocation = factory.createOne(Location);
exports.getLocation = factory.getOne(Location);
exports.getAllLocations = factory.getAll(Location);
exports.updateLocation = factory.updateOne(Location);
exports.deleteLocation = factory.deleteOne(Location);
