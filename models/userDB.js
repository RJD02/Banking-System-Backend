const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  accId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  currentBalance: {
    type: Number,
    required: true,
    default: 0,
  },
});

const userDB = mongoose.model("User", userSchema);

module.exports = userDB;
