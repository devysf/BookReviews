const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      username: {
        type: String
      },
      message: {
        type: String,
        required: true
      },
      Date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  bookName: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
