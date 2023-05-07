// Models
const { registerModel, loginModel } = require("../models");

// Helper Response
const errorResponse = require("../../../helpers/errorResponse");
const successResponse = require("../../../helpers/successResponse");

//JWT
const jwt = require("jsonwebtoken");

// bcrypt
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  if (!req.file.path) {
    return successResponse(res, "Image is required", null, null, 400);
  }
  const results = await registerModel(req.body, req.file.path);
  if (results.error) {
    return errorResponse(results.error, res);
  }
  return successResponse(res, "Register Success", results.success);
};

exports.loginUser = async (req, res) => {
  const results = await loginModel(req.body);
  if (results.error) {
    return errorResponse(results.error, res);
  }
  if (results.success === null) {
    return successResponse(res, "Wrong Email or Password", null, null, 400);
  }
  const user = results.success;
  bcrypt
    .compare(req.body.password, user.password)
    .then((cpres) => {
      if (cpres) {
        const token = jwt.sign(
          { id: user.id, role: user.role_id },
          process.env.APP_KEY || "k4Aul4h",
          { expiresIn: "12h" }
        );
        return successResponse(res, "Login Success", { token });
      }
      return successResponse(res, "Wrong Email or Password", null, null, 400);
    })
    .catch((e) => {
      return successResponse(res, "Wrong Email or Password", null, null, 400);
    });
};
