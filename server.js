require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const {
  listAllUsers,
  listAllTransactions,
  transfer,
  getUser,
} = require("./controllers/userController");
const app = express();
mongoose
  .connect(process.env.MONGO_DB_URL_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("Oh no! Mongo connection error");
    console.log(err);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", (req, res, next) => {
  // TODO: Add user auth here
  next();
});

app.get("/listAllUsers", listAllUsers);

app.get("/listAllTransactions", listAllTransactions);

app.get("/user/:id", getUser);

app.post("/transfer/:id", transfer);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});