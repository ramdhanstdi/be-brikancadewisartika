const { registerModel } = require("../models");
const errorResponse = require("../../../helpers/errorResponse");
const successResponse = require("../../../helpers/successResponse");

exports.registerUser = async (req, res) => {
  const results = await registerModel(req.body);
  if (results.error) {
    return errorResponse(results.error, res);
  }
  return successResponse(res, "Register Success", results.success);
};
