const factory = require('./handlersFactory');
const Agent = require('../models/agentModel');

exports.createAgent = factory.createOne(Agent);
exports.getAllAgents = factory.getAll(Agent);
exports.getAgent = factory.getOne(Agent);
exports.updateAgent = factory.updateOne(Agent);
exports.deleteAgent = factory.deleteOne(Agent);
