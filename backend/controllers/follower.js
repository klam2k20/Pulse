const Follower = require('../models/Follower');
const User = require('../models/User');

const getFollowers = async (req, res) => {
  let username = req.query.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Username Not Found' });
    const followers = await Follower.find({ followed: user._id }, 'follower').populate(
      'follower',
      'name username pfp'
    );
    const following = await Follower.find({ follower: user._id }, 'followed').populate(
      'followed',
      'name username pfp'
    );
    return res.json({ followers, following });
  } catch (err) {
    console.log(`Get Followers Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const addFollowed = async (req, res) => {
  const { username } = req.body;
  const id = req.user._id;

  if (!username) return res.status(400).json({ message: 'Missing a Required Field: Username' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Username Not Found' });
    if (user._id.toString() === id.toString())
      return res.status(409).json({ message: 'User Cannot Follow Him/Herself' });
    const follower = await Follower.findOne({ followed: user._id, follower: id });
    if (follower) return res.status(409).json({ message: 'Account is Already Followed' });
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

const removeFollowed = async (req, res) => {
  const username = req.query.username;
  const id = req.user._id;

  if (!username) return res.status(400).json({ message: 'Missing a Required Field: Username' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Username Not Found' });
    const follower = await Follower.findOne({ followed: user._id, follower: id });
    if (!follower) return res.status(409).json({ message: 'Account is Not Followed' });
    await Follower.deleteOne({
      followed: user._id,
      follower: id,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(`Remove Follower Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getFollowers, addFollowed, removeFollowed };
