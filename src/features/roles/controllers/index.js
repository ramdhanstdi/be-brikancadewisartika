const errorResponse = require("../../../helpers/errorResponse");
const successResponse = require("../../../helpers/successResponse");

const { createRoleModel } = require("../models");

exports.createRoles = async (req, res) => {
  const results = await createRoleModel(req.body);
  if (results.error) {
    return errorResponse(results.error, res);
  }
  return successResponse(res, "Create Role Success", results.success);
};
