const jwt = require("jsonwebtoken");
const { a_secretKey, u_secretKey } = require("../config/config");
const { STATUS_CODES } = require("../helper/statuscode");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(STATUS_CODES.Unauthorized).json({ error: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.role) {
    return res.status(STATUS_CODES.Forbidden).json({ error: "Invalid token payload" });
  }
 
  let secret;
  if (decoded.role === "admin") {
    secret = a_secretKey;
  } else if (decoded.role === "user") {
    secret = u_secretKey;
  } else {
    return res.status(STATUS_CODES.Forbidden).json({ error: "Invalid role in token" });
  }
 
  jwt.verify(token, secret, (err, verifiedPayload) => {
    if (err) {
      return res.status(STATUS_CODES.Forbidden).json({ error: "Invalid or expired token" });
    }
  
    req.user = verifiedPayload;
    next();
  });
};

module.exports = { authenticateToken };
