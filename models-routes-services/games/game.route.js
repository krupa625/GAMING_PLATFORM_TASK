const express = require("express");
const controller = require("./game.controller");
const { validateGame } = require("../../middleware/validators");
const { authenticateToken } = require("../../middleware/auth");

const router = express.Router();


router.post(
  "/admin/games",
  authenticateToken,
  validateGame,
  controller.create
);

router.put(
  "/admin/games/:id",
  authenticateToken,
  validateGame,
  controller.update
);

router.get(
  "/admin/games",
  authenticateToken,
  controller.getAll
);

router.delete(
  "/admin/games/:id",
  authenticateToken,
  controller.remove
);


router.get(
  "/user/games",
  authenticateToken,
  controller.getAll
);

router.get(
  "/user/games/:id",
  authenticateToken,
  controller.getById
);

router.get(
  "/user/games/:id/play",
  authenticateToken,
  controller.play
);

router.post(
  "/user/games/:id/score",
  authenticateToken,
  controller.submitScore
);

module.exports = router;
