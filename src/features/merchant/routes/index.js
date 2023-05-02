// Express Route
const form = require("express").Router();

// Controller
const formController = require("../controllers");

// Schema validation
const merchantSchema = require("../validation");

// Middleware
const authorization = require("../../../middleware/authentication");
const uploader = require("../../../middleware/uploader");
const validation = require("../../../middleware/validation");

form.post(
  "/create",
  merchantSchema,
  validation,
  authorization,
  uploader,
  formController.createController
);
form.get("/monitoring", authorization, formController.monitoringController);
form.get("/list", authorization, formController.listMerchant);
form.post(
  "/edit",
  merchantSchema,
  validation,
  authorization,
  uploader,
  formController.editController
);

module.exports = form;
