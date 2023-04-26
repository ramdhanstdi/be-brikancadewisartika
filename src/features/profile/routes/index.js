// Express Route
const profile = require("express").Router();

// Controller
const profileController = require("../controllers");

// Middleware Authentication
const authorization = require("../../../middleware/authentication");

profile.get("/detail", authorization, profileController.detailProfile);

module.exports = profile;
