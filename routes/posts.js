const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Post = require("../models/Post");

router.get("/test", (req, res) => {
  res.json({ msg: "in posts routing" });
});

//Get all post by date
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({
        noPost: "No Post"
      })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      user: req.user,
      bookName: req.body.bookName,
      description: req.body.description
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
