const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    sName: { type: String, required: true, index: true },
    sIcon: { type: String, required: true },
    sCategory: { type: String, required: true },
    nPlayersPlayed: { type: Number, default: 0 },
    nHighestEarned: { type: Number, default: 0 },
    sPlayURL: { type: String, required: true },
    bIsDeleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" } }
);
const GameScoreSchema = new mongoose.Schema(
  {
    sGameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    sUserName: { type: String, required: true },
    nScore: { type: Number, required: true },
    dPlayedAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" } }
);

// module.exports = mongoose.model("Game", GameSchema);
module.exports = {
  Game: mongoose.model("Game", GameSchema),
  GameScore: mongoose.model("GameScore", GameScoreSchema),
};
