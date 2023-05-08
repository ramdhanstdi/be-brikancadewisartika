const response = require("./successResponse");

const handleError = (msg, param, location = "body") => [msg, param, location];

const errorResponse = (err, res) => {
  if (err.code === "P2002" && err.meta.target[0] === "username") {
    const resErr = handleError("Username Already Use", "username");
    return response(res, "Username sudah digunakan", resErr, null, 400);
  }
  if (err.code === "P2002" && err.meta.target[0] === "pn") {
    const resErr = handleError("Username Already Use", "pn");
    return response(res, "PN sudah digunakan", resErr, null, 400);
  }
  return response(res, "Error Server", null, null, 400);
};

module.exports = errorResponse;
