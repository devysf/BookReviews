const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
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
  description: {
    type: String
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
