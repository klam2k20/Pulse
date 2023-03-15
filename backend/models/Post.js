const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    creator: { type: String, ref: "User", required: true },
    img: { type: [String], required: true },
    description: { type: String, isRequired: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
