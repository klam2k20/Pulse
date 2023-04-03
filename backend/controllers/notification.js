const Notification = require('../models/Notification');
const User = require('../models/User');

const getNotifications = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: `${username} Does Not Exist` });

    const notifications = await Notification.find({ notify: user._id });
    return res.json(notifications);
  } catch (err) {
    console.log(`Get Notifications Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = getNotifications;
