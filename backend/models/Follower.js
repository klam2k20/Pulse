const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
  {
    followed: { type: String, ref: "User", required: true },
    follower: { type: String, ref: "User", required: true },
  },

  { timestamps: true }
);

const Follower = mongoose.model("Follwoer", followerSchema);

module.exports = Follower;
