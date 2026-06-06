const { validationResult } = require("express-validator");

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

exports.errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};