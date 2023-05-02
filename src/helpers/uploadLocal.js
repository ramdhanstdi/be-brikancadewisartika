const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix + "." + ext[1]);
  },
});

const fileFilter = async (req, file, cb) => {
  const allowExt = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  if (allowExt.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const err = new Error("Upload Only Image");
    cb(err, false);
  }
};

const uploadsfile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1000000,
  },
});

module.exports = uploadsfile;
