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

//Get specific post by id
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({
        noPost: "No Post"
      })
    );
});

//create new Post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      user: req.user,
      username: req.user.name,
      bookName: req.body.bookName,
      image: req.body.image,
      description: req.body.description
    });

    newPost.save().then(post => res.json(post));
  }
);

router.post(
  "/:id/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          user: req.user,
          username: req.user.name,
          message: req.body.message
        };

        post.comments.unshift(newComment);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
