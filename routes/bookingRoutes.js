const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router
  .route('/')
  .get(bookingController.getAllBookins)
  .post(bookingController.createBooking);
router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
