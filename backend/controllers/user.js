const User = require('../models/User');
const Post = require('../models/Post');
const Follower = require('../models/Follower');

const getUsers = async (req, res) => {
  const username = req.user.username;
  const filter = '^' + req.query.username;

  try {
    const users = await User.find(
      {
        $and: [
          {
            username: { $regex: filter, $options: '-i' },
          },
          { username: { $ne: username } },
        ],
      },

      'username name pfp'
    );
    return res.json(users);
  } catch (err) {
    console.log(`Get Users Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const getFeed = async (req, res) => {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 20;
  const user = req.user._id;

  try {
    const following = await Follower.find({ follower: user }).distinct('followed');
    const posts = await Post.find({
      $or: [{ userId: user }, { userId: { $in: following } }],
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('userId', 'username name pfp');
    res.json(posts);
  } catch (err) {
    console.log(`Get Feed Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const getProfile = async (req, res) => {
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

const updateProfile = async (req, res) => {
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

module.exports = { getUsers, getFeed, getProfile, updateProfile };
