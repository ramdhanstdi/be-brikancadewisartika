const { Dropbox } = require("dropbox");
const fetch = require("isomorphic-fetch");
const multer = require("multer");
const multerDbx = require("multer-dropbox");

const dbx = new Dropbox({
  accessToken: process.env.ACCESS_TOKEN,
  fetch,
  accessTokenExpiresAt: new Date("2030-12-31T23:59:59Z"),
});

const getAccessToken = async () => {
  const response = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: process.env.REFRESH_TOKEN,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data.access_token;
};

const fileFilter = async (req, file, cb) => {
  const allowExt = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  if (allowExt.includes(file.mimetype)) {
    const accessToken = await getAccessToken();
    console.log();
    const dbxWithToken = new Dropbox({
      accessToken,
      fetch,
    });
    req.dbx = dbxWithToken;
    cb(null, true);
  } else {
    const err = new Error("Upload Only Image");
    cb(err, false);
  }
};

const uploadsfile = multer({
  storage: multerDbx(dbx, {
    path: function (req, file, cb) {
      cb(null, "/multer-uploads/" + file.originalname + Math.random());
    },
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 1200000,
  },
});

module.exports = uploadsfile;
