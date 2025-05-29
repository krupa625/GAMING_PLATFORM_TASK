const service = require("./game.service");
const { STATUS_CODES } = require("../../helper/statuscode");

const create = async (req, res) => {
  try {
    const oExisting = await service.isGameExists(req.body.sName);
    if (oExisting) {
      return res
        .status(STATUS_CODES.ResourceExist)
        .json({ error: "Game with this name already exists" });
    }

    const oGame = await service.createGame(req.body);
    res.status(STATUS_CODES.Create).json(oGame);
  } catch (oErr) {
    res.status(STATUS_CODES.BadRequest).json({ error: oErr.message });
  }
};

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const aGames = await service.getAllGames(skip, limit);
    const totalGames = await service.getTotalGamesCount();

    res.status(200).json({
      totalGames,
      currentPage: page,
      totalPages: Math.ceil(totalGames / limit),
      data: aGames,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const search = async (req, res) => {
  const sName = req.query.sName;
  if (!sName)
    return res
      .status(STATUS_CODES.BadRequest)
      .json({ error: "Query 'sName' is required" });
  const aResult = await service.searchGames(sName);
  res.json(aResult);
};

const getById = async (req, res) => {
  const oGame = await service.getGameById(req.params.id);
  if (!oGame)
    return res.status(STATUS_CODES.NotFound).json({ error: "Game not found" });
  res.json(oGame);
};

const play = async (req, res) => {
  const oGame = await service.getGameById(req.params.id);
  if (!oGame)
    return res.status(STATUS_CODES.NotFound).json({ error: "Game not found" });
  res.json({ sPlayURL: oGame.sPlayURL });
};

const update = async (req, res) => {
  try {
    const oExisting = await service.isGameExists(req.body.sName);
    if (oExisting) {
      return res
        .status(STATUS_CODES.ResourceExist)
        .json({ error: "Game with this name already exists" });
    }

    const oUpdated = await service.updateGame(req.params.id, req.body);
    if (!oUpdated)
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: "Game not found" });
    res.json(oUpdated);
  } catch (oErr) {
    res.status(STATUS_CODES.BadRequest).json({ error: oErr.message });
  }
};

const remove = async (req, res) => {
  const oDeleted = await service.deleteGame(req.params.id);
  if (!oDeleted)
    return res.status(STATUS_CODES.NotFound).json({ error: "Game not found" });
  res.json({ message: "Game deleted successfully" });
};

const submitScore = async (req, res) => {
  try {
    const oScore = await service.addGameScore({
      sGameId: req.params.id,
      sUserName: req.body.sUserName,
      nScore: req.body.nScore,
    });
    // console.log(oScore);

    res.status(STATUS_CODES.Create).json({ scoreDetails: oScore });
  } catch (oErr) {
    res.status(STATUS_CODES.BadRequest).json({ error: oErr.message });
  }
};

module.exports = {
  create,
  getAll,
  search,
  getById,
  play,
  update,
  remove,
  submitScore,
};
