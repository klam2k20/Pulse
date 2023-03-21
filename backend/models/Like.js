const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    type: { type: String, enum: ["post", "comment"], required: true },
    item: { type: String, required: true },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
