// Express Validator
const { body } = require("express-validator");

// Bcrypt
const bcrypt = require("bcrypt");

const authSchema = [
  body("email")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Must be min 6 character")
    .escape(),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password Must be min 6 character")
    .escape()
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

module.exports = authSchema;
