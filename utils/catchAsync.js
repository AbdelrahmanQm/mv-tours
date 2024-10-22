module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// This function is to replace using try catch block >> input will be a route handler and it will automatically catch any error
// and send it to the globalErrorHandler (errorController) middleware
