// Express Validator
// Express Validator
const { body } = require("express-validator");

const merchantSchema = [
  body("grup_area").notEmpty(),
  body("address").notEmpty(),
  body("category").notEmpty(),
  body("conclusion").notEmpty(),
  body("lat").notEmpty(),
  body("lng").notEmpty(),
  body("name_merchant").notEmpty(),
  body("rating").notEmpty(),
  body("realitaion_date").notEmpty(),
  body("visit_date").notEmpty(),
];

module.exports = merchantSchema;
