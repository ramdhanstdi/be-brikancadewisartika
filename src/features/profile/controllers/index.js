// Models
const { getDetailModel } = require("../models");

// Helper Response
const errorResponse = require("../../../helpers/errorResponse");
const successResponse = require("../../../helpers/successResponse");

exports.detailProfile = async (req, res) => {
  const results = await getDetailModel(req.user);
  if (results.error) {
    return errorResponse(results.error, res);
  }
  if (results.success.length < 1) {
    return successResponse(res, "Not Found", null, null, 400);
  }
  return successResponse(res, "Detail user", results.success);
};
