const user = require("express").Router();

const { deleteUserAll } = require("../controllers");

user.delete("/deleteALL", deleteUserAll);

module.exports = user;
