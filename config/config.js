const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongo_url: process.env.MONGO_URL || "mongodb://localhost:27017/",
  u_secretKey: process.env.USER_SECRET_KEY || secretKey1,
  a_secretKey: process.env.ADMIN_SECRET_KEY || secretKey2,
  p_length: process.env.PASSWORD_LENGTH || 8,
  expiryin: process.env.TOKEN_EXPIRY || "1h",
};
