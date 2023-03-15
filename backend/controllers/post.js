const Post = require("../models/Post");
const User = require("../models/User");

const getPosts = async (req, res) => {
  let username = req.params.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Username Not Found" });
    const posts = await Post.find({ creator: user._id });
    return res.json(posts);
  } catch (err) {
    console.log(`Get Posts: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getPosts };
