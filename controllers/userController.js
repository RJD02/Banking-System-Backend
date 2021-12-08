const path = require("path");
const userDB = require(path.resolve(__dirname + "./../models/userDB"));
const transferHistoryDB = require(path.resolve(
  __dirname + "/../models/transferHistoryDB"
));

const listAllUsers = async (req, res) => {
  try {
    const allUsers = await userDB.find();
    res.status(200).send(allUsers);
  } catch (e) {
    console.log("Error listing the users");
    res.status(500).send({ message: "Error Enlisting all users" });
  }
};

const listAllTransactions = async (req, res) => {
  try {
    const history = await transferHistoryDB.find();
    res.status(200).send(history);
  } catch (e) {
    console.log("Error listing the transaction history");
    res.status(500).send({ message: "Error listing transaction history" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userDB.findOne({ accId: id });
    res.status(200).send({ user });
  } catch (e) {
    console.log("Error while transfering");
    res.status(500).send({ message: "Error while getting the user" });
  }
};

const transfer = async (req, res) => {
  const { sender, receiver, amtTransfered } = req.body;
  const newTransactionHistory = new transferHistoryDB({
    ...req.body,
  });
  const senderUser = await userDB.findOne({ name: sender });
  const receiverUser = await userDB.findOne({ name: receiver });
  await newTransactionHistory.save();
  const senderCurrentBalance =
    senderUser.currentBalance - amtTransfered >= 0
      ? senderUser.currentBalance - amtTransfered
      : senderUser.currentBalance;
  const receiverCurrentBalance =
    senderUser.currentBalance - amtTransfered >= 0
      ? receiverUser.currentBalance + amtTransfered
      : receiverUser.currentBalance;
  await userDB.findOneAndUpdate(
    { name: sender },
    {
      currentBalance: senderCurrentBalance,
    },
    { new: true }
  );
  await userDB.findOneAndUpdate(
    { name: receiver },
    {
      currentBalance: receiverCurrentBalance,
    },
    { new: true }
  );
};

module.exports = { listAllUsers, listAllTransactions, getUser, transfer };
