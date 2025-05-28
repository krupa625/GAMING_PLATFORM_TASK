const express = require("express");
const controller = require("./user.controller");
const { validateSignup } = require("../../middleware/validators");

const router = express.Router();

router.post("/user/signup", validateSignup, controller.signup);
router.post("/user/login", controller.login);

module.exports = router;
