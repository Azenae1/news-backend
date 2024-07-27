const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/errorHandler");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/news-explorer")
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());
app.use("/", mainRouter);

app.use(errors());
app.use(errorHandler);

// Server launch:
// GitBash "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"
// PowerShell C:\"Program Files"\MongoDB\Server\5.0\bin\mongo.exe
