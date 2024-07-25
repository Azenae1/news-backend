const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { errors } = require("celebrate");
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
app.use("/", mainRouter);
