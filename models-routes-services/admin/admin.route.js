const express = require("express");
const controller = require("./admin.controller");
const { validateSignup } = require("../../middleware/validators");

const router = express.Router();

router.post("/admin/signup", validateSignup, controller.signup);
router.post("/admin/login", controller.login);

module.exports = router;
