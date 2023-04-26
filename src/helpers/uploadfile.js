const multerDbx = require("multer-dropbox");
const multer = require("multer");
const { Dropbox } = require("dropbox");
const fetch = require("isomorphic-fetch");

const dbx = new Dropbox({
  accessToken: process.env.ACCESS_TOKEN,
  fetch,
  accessTokenExpiresAt: new Date("2030-12-31T23:59:59Z"),
});

const fileFilter = (req, file, cb) => {
  const allowExt = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  if (allowExt.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const err = new Error("Upload Only Image");
    cb(err, false);
  }
};

const uploadsfile = multer({
  storage: multerDbx(dbx, {
    path: function (req, file, cb) {
      cb(null, "/multer-uploads/" + file.originalname);
    },
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 2097152,
  },
});

module.exports = uploadsfile;
