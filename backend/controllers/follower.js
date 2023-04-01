const Follower = require('../models/Follower');
const User = require('../models/User');

const getFollowers = async (req, res) => {
  let username = req.query.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Username Not Found' });
    const followers = await Follower.find({ followed: user._id });
    const following = await Follower.find({ follower: user._id });
    return res.json({ followers, following });
  } catch (err) {
    console.log(`Get Followers Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const addFollower = async (req, res) => {
  const { username } = req.body;
  const id = req.user._id;

  if (!username) return res.status(400).json({ message: 'Missing required username' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Username Not Found' });
    await Follower.create({
      followed: user._id,
      follower: id,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(`Add Follower Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const removeFollower = async (req, res) => {
  const { username } = req.body;
  const id = req.user._id;

  if (!username) return res.status(400).json({ message: 'Missing required username' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Username Not Found' });
    await Follower.deleteOne({
      followed: user._id,
      follower: id,
    });
    return res.status(200);
  } catch (err) {
    console.log(`Remove Follower Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getFollowers, addFollower, removeFollower };
