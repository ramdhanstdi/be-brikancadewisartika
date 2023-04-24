// Express Route
const form = require("express").Router();

// Controller
const formController = require("../controllers");

form.post("/create", formController.createController);

module.exports = form;
