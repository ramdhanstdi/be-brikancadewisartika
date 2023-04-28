// Express Route
const form = require("express").Router();

// Controller
const formController = require("../controllers");

// Middleware
const authorization = require("../../../middleware/authentication");
const uploader = require("../../../middleware/uploader");

form.post("/create", authorization, uploader, formController.createController);
form.get("/monitoring", authorization, formController.monitoringController);

module.exports = form;
