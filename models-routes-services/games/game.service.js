const { Game, GameScore } = require("./game.model");

const createGame = async (oData) => Game.create(oData);

const getAllGames = async () => Game.find({ bIsDeleted: false });

const searchGames = async (sName) =>
  Game.find({ sName: new RegExp(sName, "i"), bIsDeleted: false });

const getGameById = async (sId) =>
  Game.findOne({ _id: sId, bIsDeleted: false });

const updateGame = async (sId, oData) =>
  Game.findOneAndUpdate({ _id: sId, bIsDeleted: false }, oData, { new: true });

const deleteGame = async (sId) =>
  Game.findOneAndUpdate(
    { _id: sId, bIsDeleted: false },
    { bIsDeleted: true },
    { new: true }
  );

const isGameExists = async (sName) =>
  Game.findOne({
    sName: new RegExp(`^${sName}$`, "i"),
    bIsDeleted: false,
  });

const addGameScore = async (oData) => {
  return await GameScore.create(oData);
};
module.exports = {
  createGame,
  getAllGames,
  searchGames,
  getGameById,
  updateGame,
  deleteGame,
  isGameExists,
  addGameScore,
};
