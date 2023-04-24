const role = require("express").Router();
const roleController = require("../controllers");

role.post("/create", roleController.createRoles);

module.exports = role;
