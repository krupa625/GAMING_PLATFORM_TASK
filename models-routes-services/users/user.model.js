const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    sName: { type: String, required: true },
    sEmail: { type: String, required: true, unique: true },
    sPassword: { type: String, required: true },
  },
  { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" } }
);

module.exports = mongoose.model("User", UserSchema);
