const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    images: { type: [String], required: true },
    caption: { type: String, isRequired: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
