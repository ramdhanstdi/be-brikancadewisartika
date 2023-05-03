// Helper Response
const successResponse = require("../helpers/successResponse");

// Express Validator
const { validationResult } = require("express-validator");

const validation = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return successResponse(res, "Data Belum Lengkap", error.array(), null, 400);
  }
  next();
};

module.exports = validation;
