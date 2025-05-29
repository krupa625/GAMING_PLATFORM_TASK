const { Game, GameScore } = require("./game.model");


const createGame = async (oData) => Game.create(oData);


const getGames = async (query, nSkip, nLimit) => {
  const oCondition = { bIsDeleted: false };

  if (query.sName) {
    oCondition.sName = { $regex: query.sName, $options: "i" };
  }

  if (query.sCategory) {
    oCondition.sCategory = query.sCategory;
  }

  return Game.find(oCondition)
    .skip(nSkip)
    .limit(nLimit)
    .lean();
};


const getGamesCount = async (query) => {
  const oCondition = { bIsDeleted: false };

  if (query.sName) {
    oCondition.sName = { $regex: query.sName, $options: "i" };
  }

  if (query.sCategory) {
    oCondition.sCategory = query.sCategory;
  }

  return Game.countDocuments(oCondition);
};


const getGameById = async (sId) =>
  Game.findOne({ _id: sId, bIsDeleted: false }).lean();


const updateGame = async (sId, oData) =>
  Game.findOneAndUpdate({ _id: sId, bIsDeleted: false }, oData, {
    new: true,
  }).lean();


const deleteGame = async (sId) =>
  Game.findOneAndUpdate(
    { _id: sId, bIsDeleted: false },
    { bIsDeleted: true },
    { new: true }
  ).lean();


const isGameExists = async (sName) =>
  Game.findOne({
    sName: new RegExp(`^${sName}$`, "i"),
    bIsDeleted: false,
  }).lean();


const addGameScore = async (oData) => GameScore.create(oData);

module.exports = {
  createGame,
  getGames,
  getGamesCount,
  getGameById,
  updateGame,
  deleteGame,
  isGameExists,
  addGameScore,
};
