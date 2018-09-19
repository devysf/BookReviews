const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoDB = require("./config/mongodbKeys").mongoURI;

mongoose
  .connect(mongoDB)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is running on port " + port));
