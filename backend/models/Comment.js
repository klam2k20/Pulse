const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    parentId: { type: mongoose.Types.ObjectId, ref: "Comment" },
    postId: { type: String, ref: "Post", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
