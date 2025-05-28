const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("./admin.service");
const { a_secretKey, expiryin } = require("../../config/config");
const { STATUS_CODES } = require("../../helper/statuscode");

const signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.sPassword, 10);
  const admin = await service.createAdmin({
    sName: req.body.sName,
    sEmail: req.body.sEmail,
    sPassword: hashedPassword,
  });
  res.status(STATUS_CODES.Create).json(admin);
};

const login = async (req, res) => {
  const admin = await service.getAdminByEmail(req.body.sEmail);
  if (!admin)
    return res.status(STATUS_CODES.NotFound).json({ error: "Admin not found" });

  const isMatch = await bcrypt.compare(req.body.sPassword, admin.sPassword);
  if (!isMatch)
    return res
      .status(STATUS_CODES.Unauthorized)
      .json({ error: "Invalid password" });

  const token = jwt.sign({ id: admin._id, role: "admin" }, a_secretKey, {
    expiresIn: expiryin,
  });
  res.json({ token });
};

module.exports = {
  signup,
  login,
};
