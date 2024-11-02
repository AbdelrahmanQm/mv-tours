const express = require('express');
const userRoutes = require('./userRoutes');
const tourRoutes = require('./tourRoutes');
const locationRoutes = require('./locationRoutes');
const agentRoutes = require('./agentRoutes');
const bookingRoutes = require('./bookingRoutes');

const router = express.Router();

// v1 routes
router.use('/v1/users', userRoutes);
router.use('/v1/tours', tourRoutes);
router.use('/v1/location', locationRoutes);
router.use('/v1/agent', agentRoutes);
router.use('/v1/booking', bookingRoutes);

// future versions
// router.use('/v2/users', userRoutesV2);

module.exports = router;
