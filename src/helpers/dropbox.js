const dropbox = require("express").Router();
const url = require("url");
const queryString = require("querystring");
const https = require("https");

dropbox.get("/grant", (req, res, next) => {
  const options = {
    hostname: "www.dropbox.com",
    pathname: "/oauth2/authorize",
    method: "GET",
    query: {
      client_id: process.env.CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.REDIRECT_URL,
      token_access_type: "offline",
    },
  };
  console.log("redirect", res.redirect(url.format(options)));
  return res.redirect(url.format(options));
});

dropbox.get("/callback", (req, res, next) => {
  if (req.query.error) {
    console.log("reqquery", req.query);
    return res.end(res.query.error_description);
  }
  const options = {
    hostname: "api.dropboxapi.com",
    path: "/oauth2/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const bodyParams = queryString.stringify({
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:8080/api/v1/dropbox/callback",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });

  https
    .request(options, (resp) => {
      if (resp.statusCode !== 200) {
        return res.end(resp.statusMessage);
      }
      const creds = [];
      resp.on("data", (chunk) => {
        creds.push(chunk);
        console.log("chunk", chunk);
      });
      resp.on("end", () => {
        creds.push(creds.toString());
        const token = JSON.parse(creds[1]);
        console.log(token);
        req.tokenDropbox = token.access_token;
        req.refreshTokenDropbox = token.refresh_token; // set the refresh token to the request object
      });
    })
    .end(bodyParams);
});

dropbox.get("/refresh-token", (req, res, next) => {
  const options = {
    hostname: "api.dropboxapi.com",
    path: "/oauth2/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const bodyParams = queryString.stringify({
    grant_type: "refresh_token",
    refresh_token: req.refreshTokenDropbox,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });

  https
    .request(options, (resp) => {
      if (resp.statusCode !== 200) {
        return res.end(resp.statusMessage);
      }
      const creds = [];
      resp.on("data", (chunk) => {
        creds.push(chunk);
        console.log("chunk", chunk);
      });
      resp.on("end", () => {
        creds.push(creds.toString());
        const token = JSON.parse(creds[1]);
        console.log(token);
        req.tokenDropbox = token.access_token;
      });
    })
    .end(bodyParams);
});

module.exports = dropbox;
