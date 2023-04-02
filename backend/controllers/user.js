const User = require('../models/User');
const Post = require('../models/Post');
const Follower = require('../models/Follower');

const getUserProfile = async (req, res) => {
  let username = req.params.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username }, 'name username pfp pronouns bio');
    if (!user) return res.status(404).json({ message: `${username} Does Not Exist` });
    const posts = await Post.count({ userId: user._id });
    const followers = await Follower.count({ followed: user._id });
    const following = await Follower.count({ follower: user._id });
    return res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      pfp: user.pfp,
      pronouns: user.pronouns,
      bio: user.bio,
      posts,
      followers,
      following,
    });
  } catch (err) {
    console.log(`Get User Profile Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const updateUserProfile = async (req, res) => {
  const username = req.params.username;
  const { name, pronouns, bio, pfp } = req.body;

  if (!name || !pronouns || !bio || !pfp)
    return res.status(400).json({
      message: 'Missing One or More Required Fields: Name, Pronouns, Bio, and/or Profile Photo',
    });

  try {
    const user = await User.findOneAndUpdate({ username }, { $set: req.body }, { new: true });
    if (!user) return res.status(400).json({ message: `${username} Does Not Exist` });
    res.json(user);
  } catch (err) {
    console.log(`Update User Profile Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getUserProfile, updateUserProfile };
