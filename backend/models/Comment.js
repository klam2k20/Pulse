const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    type: { type: String, enum: ["post", "comment"] },
    item: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
