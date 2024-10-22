const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');

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
