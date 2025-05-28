const jwt = require("jsonwebtoken");
const { a_secretKey, u_secretKey } = require("../config/config");
const { STATUS_CODES } = require("../helper/statuscode");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(STATUS_CODES.Unauthorized)
      .json({ error: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  const payloadPart = token.split(".")[1];
  if (!payloadPart) {
    return res
      .status(STATUS_CODES.Forbidden)
      .json({ error: "Invalid token format" });
  }

  let payloadJson;
  try {
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const buff = Buffer.from(base64, "base64");
    payloadJson = JSON.parse(buff.toString("utf-8"));
  } catch (e) {
    return res
      .status(STATUS_CODES.Forbidden)
      .json({ error: "Invalid token payload" });
  }

  const role = payloadJson.role;
  if (!role) {
    return res
      .status(STATUS_CODES.Forbidden)
      .json({ error: "Role missing in token" });
  }

  let secret;
  if (role === "admin") {
    secret = a_secretKey;
  } else if (role === "user") {
    secret = u_secretKey;
  } else {
    return res
      .status(STATUS_CODES.Forbidden)
      .json({ error: "Invalid role in token" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(STATUS_CODES.Forbidden)
        .json({ error: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };
