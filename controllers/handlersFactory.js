const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

// GET ALL: Function to handle queries for getting all data, supports (filter, field selection, sort and pagination)
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .filterFields()
      .sort()
      .paginate();

    const docs = await features.query;
    res.status(200).json({
      status: 'success',
      nDocs: docs.length,
      data: docs,
    });
  });

// GET ONE of any model

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError('There is no document with this ID!', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// CREATE ONE Of any model

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// UPDATE ONE of any model

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('There is no document with this ID!', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// DELETE ONE

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('There is no document with this ID!', 404));
    }
    res.status(202).json({
      status: 'success',
      message: 'Document has been deleted successfully!',
    });
  });
