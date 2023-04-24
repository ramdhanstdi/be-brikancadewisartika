const auth = require("express").Router();
const authController = require("../controllers");
const authSchema = require("../validation");
const validation = require("../../../middleware/validation");

auth.post("/register", authSchema, validation, authController.registerUser);

module.exports = auth;
