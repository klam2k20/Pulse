const Follower = require('../models/Follower');
const User = require('../models/User');
const Notification = require('../models/Notification');

const getFollowers = async (req, res) => {
  let username = req.query.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: `${username} Does Not Exist` });
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
    if (!user) return res.status(404).json({ message: `${username} Does Not Exist` });
    if (user._id.toString() === id.toString())
      return res.status(409).json({ message: 'User Cannot Follow Him/Herself' });
    const follower = await Follower.findOne({ followed: user._id, follower: id });
    if (follower) return res.status(409).json({ message: `${username} is Already Followed` });
    await Follower.create({
      followed: user._id,
      follower: id,
    });
    if (user._id.toString() !== id.toString())
      await Notification.create({
        notify: user._id,
        user: id,
        type: 'follow',
      });
    return res.sendStatus(200);
  } catch (err) {
    console.log(`Add Follower Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const deleteFollowed = async (req, res) => {
  const username = req.query.username;
  const id = req.user._id;

  if (!username) return res.status(400).json({ message: 'Missing a Required Field: Username' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: `${username} Does Not Exist` });
    const follower = await Follower.findOne({ followed: user._id, follower: id });
    if (!follower) return res.status(409).json({ message: `${username} is Not Followed` });
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

module.exports = { getFollowers, addFollowed, deleteFollowed };
