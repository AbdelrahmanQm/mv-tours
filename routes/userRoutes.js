const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

/* ========== User Routes ========== */
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post(
  '/me',
  authController.protect,
  authController.getMe,
  userController.getUser,
);
router.post('/forgotPassword', authController.forgotUserPassword);
router.post('/resetPassword/:token', authController.resetPassword);

/* ========== Admin Routes ========== */
// router.use(authController.protect);
// router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
