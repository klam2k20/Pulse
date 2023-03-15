const Follower = require("../models/Follower");
const User = require("../models/User");

const getFollowers = async (req, res) => {
  let username = req.params.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Username Not Found" });
    const followers = await Follower.find({ followed: user._id });
    return res.json(followers);
  } catch (err) {
    console.log(`Get Followers: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getFollowers };
