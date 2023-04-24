const successResponse = require("../helpers/successResponse");
const { validationResult } = require("express-validator");

const validation = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return successResponse(res, "Error Accured", error.array(), null, 400);
  }
  next();
};

module.exports = validation;
