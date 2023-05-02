const uploadsfile = require("../helpers/uploadLocal");

const uploader = (req, res, next) => {
  const upload = uploadsfile.single("images");
  upload(req, res, (err) => {
    if (err) {
      return res.json({
        status: false,
        message: `Failed to upload ${err.message}`,
      });
    }
    next();
  });
};

module.exports = uploader;
