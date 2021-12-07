const mongoose = require("mongoose");

const transferHistorySchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  amtTransfered: {
    type: Number,
    required: true,
  },
  transferDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const transferHistoryDB = new mongoose.model(
  "TransactionHistory",
  transferHistorySchema
);

module.exports = transferHistoryDB;
