// Express Route
const auth = require("express").Router();

// Controller
const authController = require("../controllers");

// Schema validation
const authSchema = require("../validation");

// Middleware validation
const validation = require("../../../middleware/validation");

auth.post("/register", authSchema, validation, authController.registerUser);
auth.post("/login", authController.loginUser);

module.exports = auth;
