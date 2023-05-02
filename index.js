// ENV
require("dotenv").config();
const port = process.env.PORT;

// Body Parser
const bodyParser = require("body-parser");

// Express
const express = require("express");

// CORS
const cors = require("cors");

// Cookie
const cookieParser = require("cookie-parser");

const app = express();

app.use("/uploads", express.static("uploads"));

// Cookie
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.options("*", cors()); // enable pre-flight request for all routes

// Route Index
app.use("/api/v1", require("./src/routes"));

// Route default
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Backend running",
  });
});

// Route not found
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Path Not Found",
  });
});

// Listen
app.listen(port, () => {
  console.log(`App Run In Port ${port}`);
});
