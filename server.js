const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const posts = require("./routes/posts");

const app = express();

// Body parser middleware settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Mongodb keys for connect to mlab
const mongoDB = require("./config/mongodbKeys").mongoURI;

//Connect to mongodb server
mongoose
  .connect(mongoDB)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

//Passport middleware initialize
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Using Routes
app.use("/users", users);
app.use("/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is running on port " + port));
