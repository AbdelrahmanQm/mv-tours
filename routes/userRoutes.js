const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.getAllUsers)
  .post(authController.createUser);
module.exports = router;