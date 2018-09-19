const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const registerValidation = require("../validation/register");
const loginValidation = require("../validation/login");

router.get("/test", (req, res) => {
  res.json({ msg: "in users routing" });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  //Check register form input
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email is already exist.";
      return res.status(400).json(errors);
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
  const { errors, isValid } = loginValidation(req.body);

  //Check register form input
  if (!isValid) {
    return res.status(400).json(errors);
  }

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
        errors.password = "Password is wrong";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
