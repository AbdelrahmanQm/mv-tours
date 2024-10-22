const AppError = require('../utils/appError');
// Handling custom errors
// Validation Errors
const handleValidationError = (err) => {
  const message = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Error validating data: ${message.join('. ')}`, 400);
};

// Error return on Production process.env=production
const sendErrorProd = (err, res) => {
  // if the error is operational >> send error message to user
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // if the error is operational >> displayed error message will be ('Something went worng!') and console.log(error)
    console.error('Error', err.name);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
// Error return on Develoment process.env=development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
// Global Error Controller
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went very wrong!';
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error._message === 'User validation failed')
      error = handleValidationError(error);
    sendErrorProd(error, res);
  } else if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  next();
};
