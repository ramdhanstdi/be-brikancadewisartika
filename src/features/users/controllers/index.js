// Models
const { deleteAllUser } = require("../models");

// Helper Response
const successResponse = require("../../../helpers/successResponse");
const errorResponse = require("../../../helpers/errorResponse");

exports.deleteUserAll = async (req, res) => {
  const results = await deleteAllUser();
  if (results.error) {
    return errorResponse(results.error, res);
  }

  return successResponse(res, "User Deleted", results.success);
};
