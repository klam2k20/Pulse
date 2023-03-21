const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    parent: { type: String },
    post: { type: String, ref: "Post", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
