const { body } = require("express-validator");

exports.registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];