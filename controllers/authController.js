const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

class AppFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
}
