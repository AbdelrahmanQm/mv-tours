const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(tourController.getAllTours).post(
  authController.protect,
  // authController.restrictTo('admin', 'editor'),
  tourController.createTour,
);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'editor'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'editor'),
    tourController.deleteTour,
  );
module.exports = router;
