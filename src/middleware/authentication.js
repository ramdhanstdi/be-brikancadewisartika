// JWT
const jwt = require("jsonwebtoken");

// Helper Response
const successResponse = require("../helpers/successResponse");

const authorization = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const auth = req.headers.authorization.split(" ")[1];
    console.log("split", auth);
    try {
      const result = jwt.verify(auth, process.env.APP_KEY || "k4Aul4h");
      req.user = result;
      next();
    } catch (error) {
      return successResponse(res, "Token Expired", null, null, 401);
    }
  } else {
    return successResponse(res, "Token Expired", null, null, 401);
  }
};

module.exports = authorization;
