const service = require("./game.service");
const { STATUS_CODES } = require("../../helper/statuscode");


const create = async (req, res) => {
  try {
    const existingGame = await service.isGameExists(req.body.sName);
    if (existingGame) {
      return res.status(STATUS_CODES.ResourceExist).json({
        error: "Game with this name already exists",
      });
    }

    const newGame = await service.createGame(req.body);
    return res.status(STATUS_CODES.Create).json(newGame);
  } catch (error) {
    return res.status(STATUS_CODES.BadRequest).json({ error: error.message });
  }
};


const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const games = await service.getGames(req.query, skip, limit);
    const totalGames = await service.getGamesCount(req.query);

    return res.status(STATUS_CODES.OK).json({
      totalGames,
      currentPage: page,
      totalPages: Math.ceil(totalGames / limit),
      data: games,
    });
  } catch (error) {
    return res.status(STATUS_CODES.InternalServerError).json({
      error: error.message,
    });
  }
};


const getById = async (req, res) => {
  try {
    const game = await service.getGameById(req.params.id);
    if (!game) {
      return res.status(STATUS_CODES.NotFound).json({ error: "Game not found" });
    }
    return res.status(STATUS_CODES.OK).json(game);
  } catch (error) {
    return res.status(STATUS_CODES.BadRequest).json({ error: error.message });
  }
};


const play = async (req, res) => {
  try {
    const game = await service.getGameById(req.params.id);
    if (!game) {
      return res.status(STATUS_CODES.NotFound).json({ error: "Game not found" });
    }
    return res.status(STATUS_CODES.OK).json({ sPlayURL: game.sPlayURL });
  } catch (error) {
    return res.status(STATUS_CODES.BadRequest).json({ error: error.message });
  }
};


const update = async (req, res) => {
  try {
    const existingGame = await service.isGameExists(req.body.sName);
    if (existingGame) {
      return res.status(STATUS_CODES.ResourceExist).json({
        error: "Game with this name already exists",
      });
    }

    const updatedGame = await service.updateGame(req.params.id, req.body);
    if (!updatedGame) {
      return res.status(STATUS_CODES.NotFound).json({ error: "Game not found" });
    }
    return res.status(STATUS_CODES.OK).json(updatedGame);
  } catch (error) {
    return res.status(STATUS_CODES.BadRequest).json({ error: error.message });
  }
};


const remove = async (req, res) => {
  try {
    const deletedGame = await service.deleteGame(req.params.id);
    if (!deletedGame) {
      return res.status(STATUS_CODES.NotFound).json({ error: "Game not found" });
    }
    return res
      .status(STATUS_CODES.OK)
      .json({ message: "Game deleted successfully" });
  } catch (error) {
    return res.status(STATUS_CODES.BadRequest).json({ error: error.message });
  }
};


const submitScore = async (req, res) => {
  try {
    const score = await service.addGameScore({
      sGameId: req.params.id,
      sUserName: req.body.sUserName,
      nScore: req.body.nScore,
    });

    return res
      .status(STATUS_CODES.Create)
      .json({ scoreDetails: score });
  } catch (error) {
    return res.status(STATUS_CODES.BadRequest).json({ error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  play,
  update,
  remove,
  submitScore,
};
