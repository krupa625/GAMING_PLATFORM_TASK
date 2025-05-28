const Admin = require("./admin.model");

const createAdmin = async (data) => Admin.create(data);
const getAdminByEmail = async (email) => Admin.findOne({ sEmail: email });

module.exports = {
  createAdmin,
  getAdminByEmail,
};
