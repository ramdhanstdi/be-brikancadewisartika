// Express Validator
// Express Validator
const { body } = require("express-validator");

const merchantSchema = [
  body("grup_area")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("address")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("category")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("conclusion")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("lat")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("lng")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("name_merchant")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("rating")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("realitaion_date")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
  body("visit_date")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Password Tidak boleh kosong"),
];

module.exports = merchantSchema;
