const User = require("../models/User");
const Post = require("../models/Post");
const Follower = require("../models/Follower");

const getUserProfile = async (req, res) => {
  let username = req.params.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username }, "name username pfp pronouns bio");
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const posts = await Post.find({ creator: user._id }, "-updatedAt").sort({ createdAt: -1 });
    const followers = await Follower.find({ followed: user._id }, "name username");
    const following = await Follower.find({ follower: user._id }, "name username");
    return res.json({ user, posts, followers, following });
  } catch (err) {
    console.log(`Get User Profile: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const updateUserProfile = async (req, res) => {
  const username = req.params.username;
  const { name, pronouns, bio, pfp } = req.body;

  if (!name || !pronouns || !bio || !pfp)
    return res.status(400).json({
      message: "Missing one or more Required Fields: Name, Pronouns, Bio, and/or Profile Photo",
    });

  try {
    const user = await User.findOneAndUpdate({ username }, { $set: req.body }, { new: true });
    if (!user) return res.status(400).json({ message: "User Not Found" });
    res.json(user);
  } catch (err) {
    console.log(`Update User Profile: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getUserProfile, updateUserProfile };
