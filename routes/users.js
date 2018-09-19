const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.get("/test", (req, res) => {
  res.json({ msg: "in users routing" });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json("Email is already exist.");
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
        if (err) throw err;
        newUser.password = hashedPassword;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).json("User not found");
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        return res.json("Hello " + user.name + ". You are logged in");
      } else {
        return res.status(400).json("Password is wrong");
      }
    });
  });
});

module.exports = router;
