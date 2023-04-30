// Models
const { createModel, readModel, listModel } = require("../models");

// Helper Response
const errorResponse = require("../../../helpers/errorResponse");
const successResponse = require("../../../helpers/successResponse");

exports.createController = async (req, res) => {
  const result = await createModel(req.body, req.user, req.file.result.id);
  if (result.error) {
    return errorResponse(result.error, res);
  }
  return successResponse(res, "Data has been saved", result.success);
};

exports.monitoringController = async (req, res) => {
  const result = await readModel(req.query);
  if (result.error) {
    return errorResponse(result.error, res);
  }
  return successResponse(res, "Show all Data", result.success);
};

exports.listMerchant = async (req, res) => {
  const result = await listModel(req.query);
  if (result.error) {
    return errorResponse(result.error, res);
  }
  return successResponse(res, "Show all Data", result.success);
};
