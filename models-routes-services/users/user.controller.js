const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("./user.service");
const { u_secretKey, expiryin } = require("../../config/config");
const { STATUS_CODES } = require("../../helper/statuscode");

const signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.sPassword, 10);
  const user = await service.createUser({
    sName: req.body.sName,
    sEmail: req.body.sEmail,
    sPassword: hashedPassword,
  });
  res.status(STATUS_CODES.Create).json(user);
};

const login = async (req, res) => {
  const user = await service.getUserByEmail(req.body.sEmail);
  if (!user)
    return res.status(STATUS_CODES.NotFound).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(req.body.sPassword, user.sPassword);
  if (!isMatch)
    return res
      .status(STATUS_CODES.Unauthorized)
      .json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id, role: "user" }, u_secretKey, {
    expiresIn: expiryin,
  });
  res.json({ token });
};

module.exports = {
  signup,
  login,
};
