const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    parent: { type: String },
    post: { type: String, ref: "Post", required: true },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
