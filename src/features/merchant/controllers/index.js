// Models
const {
  createModel,
  readModel,
  listModel,
  editModel,
  listByIdModel,
} = require("../models");

// Helper Response
const errorResponse = require("../../../helpers/errorResponse");
const successResponse = require("../../../helpers/successResponse");

exports.createController = async (req, res) => {
  if (!req.file.path) {
    return successResponse(res, "Image is required", null, null, 400);
  }
  const result = await createModel(req.body, req.user, req.file.path);
  if (result.error) {
    return errorResponse(result.error, res);
  }
  return successResponse(res, "Data has been saved", result.success);
};

exports.editController = async (req, res) => {
  if (!req.file.path) {
    return successResponse(res, "Image is required", null, null, 400);
  }
  const result = await editModel(req.body, req.file.path);
  if (result.error) {
    return errorResponse(result.error, res);
  }
  return successResponse(res, "Data has been update", result.success);
};

exports.monitoringController = async (req, res) => {
  const result = await readModel();
  if (result.error) {
    return errorResponse(result.error, res);
  }
  return successResponse(res, "Showing All Data", result.success);
};

exports.listMerchant = async (req, res) => {
  const result = await listModel(req.query);
  const pageInfo = {};
  pageInfo.totalData = result.totalData;
  pageInfo.totalPage = Math.ceil(result.totalData / 10) - 1;
  pageInfo.curretPage = parseInt(req.query.page);
  pageInfo.nextPage =
    pageInfo.curretPage < pageInfo.totalPage ? pageInfo.curretPage + 1 : null;
  pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage - 1 : null;
  if (result.error) {
    return errorResponse(result.error, res);
  }
  return successResponse(
    res,
    "Showing All List Data",
    result.success,
    pageInfo
  );
};

exports.listByIdMerchant = async (req, res) => {
  const result = await listByIdModel(req.query, req.user);
  const pageInfo = {};
  pageInfo.totalData = result.totalData;
  pageInfo.totalPage = Math.ceil(result.totalData / 10) - 1;
  pageInfo.curretPage = parseInt(req.query.page);
  pageInfo.nextPage =
    pageInfo.curretPage < pageInfo.totalPage ? pageInfo.curretPage + 1 : null;
  pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage - 1 : null;
  if (result.error) {
    return errorResponse(result.error, res);
  }
  return successResponse(
    res,
    "Showing All List Data",
    result.success,
    pageInfo
  );
};
