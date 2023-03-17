const User = require("../models/User");

const getUserProfile = async (req, res) => {
  if (!req.params.username) return res.json(req.user);

  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    return res.json(user);
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
