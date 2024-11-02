const express = require('express');
const morgan = require('morgan');
// const globalErrorHandler = require('./controllers/errorController');
const router = require('./routes');

// Creating Express App
const app = express();

// Using third party Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Router
app.use('/api', router);

// Using created Middlewares
//app.use(globalErrorHandler);
module.exports = app;
