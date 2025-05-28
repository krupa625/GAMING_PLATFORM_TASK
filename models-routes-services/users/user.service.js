const User = require("./user.model");

const createUser = async (data) => User.create(data);
const getUserByEmail = async (email) => User.findOne({ sEmail: email });

module.exports = {
  createUser,
  getUserByEmail,
};
