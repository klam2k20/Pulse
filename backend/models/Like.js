const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    parentId: { type: String, ref: "Comment" },
    postId: { type: String, ref: "Post", required: true },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
