// JWT
const jwt = require("jsonwebtoken");

// Helper Response
const successResponse = require("../helpers/successResponse");

const authorization = (req, res, next) => {
  if (req.headers.authorization) {
    const auth = req.headers.authorization;
    const prefix = "Bearer ";
    if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length, auth.length);
      try {
        const result = jwt.verify(token, process.env.APP_KEY || "k4Aul4h");
        req.user = result;
        next();
      } catch (error) {
        return successResponse(res, "Token Expired", null, null, 401);
      }
    }
  } else {
    return successResponse(res, "Token Expired", null, null, 401);
  }
};

module.exports = authorization;
