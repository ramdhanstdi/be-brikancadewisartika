// ENV
require("dotenv").config();
const port = process.env.PORT;

// Express
const express = require("express");

// CORS
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

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
