const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const userRoutes = require('./routes/userRoutes');

// Creating Express App
const app = express();

// Using third party Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Route handlers
app.use('/api/v1/users', userRoutes);

// Using created Middlewares
//app.use(globalErrorHandler);
module.exports = app;
