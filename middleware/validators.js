const { body, validationResult } = require("express-validator");
const { STATUS_CODES } = require("../helper/statuscode");
const { p_length } = require("../config/config");

const validateGame = [
  body("sName").notEmpty().withMessage("Name is required"),
  body("sIcon").isURL().withMessage("Icon must be a valid URL"),
  body("sCategory").notEmpty().withMessage("Category is required"),
  body("nPlayersPlayed")
    .isNumeric()
    .withMessage("Players played must be a number"),
  body("nHighestEarned")
    .isNumeric()
    .withMessage("Highest earned must be a number"),
  body("sPlayURL").isURL().withMessage("playURL must be a valid URL"),
  (req, res, next) => {
    const oErrors = validationResult(req);
    if (!oErrors.isEmpty()) {
      return res
        .status(STATUS_CODES.UnprocessableEntity)
        .json({ errors: oErrors.array() });
    }
    next();
  },
];
const validateSignup = [
  body("sName").notEmpty().withMessage("Name is required"),
  body("sEmail").isEmail().withMessage("Valid email is required"),
  body("sPassword")
    .isLength({ min: p_length })
    .withMessage(`Password minimum ${p_length} characters`),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(STATUS_CODES.UnprocessableEntity)
        .json({ errors: errors.array() });
    next();
  },
];

module.exports = {
  validateGame,
  validateSignup,
};
