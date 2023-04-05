const Notification = require('../models/Notification');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const getNotifications = async (req, res) => {
  const id = req.user._id;

  try {
    /** Mongoose aggregation to:
     *    find all notifications for a specific user within 3 months
     *    add a relative date from today - 1d, 1w, 4w
     *    group notifications into this week, this mont, and earlier
     */
    const threshold = new Date();
    threshold.setMonth(threshold.getMonth() - 3);
    const notifications = await Notification.aggregate([
      /** match notify id and within 3 months */
      {
        $match: {
          $and: [{ notify: id }, { createdAt: { $gte: threshold } }],
        },
      },
      /** add relative date */
      {
        $set: {
          relativeDate: {
            $let: {
              vars: {
                diffInDays: {
                  $floor: { $divide: [{ $subtract: [new Date(), '$createdAt'] }, 86400000] },
                },
              },
              in: {
                $switch: {
                  branches: [
                    {
                      case: { $lte: ['$$diffInDays', 7] },
                      then: { $concat: [{ $toString: '$$diffInDays' }, 'd'] },
                    },
                    {
                      case: { $lte: ['$$diffInDays', 30] },
                      then: {
                        $concat: [{ $toString: { $floor: { $divide: ['$$diffInDays', 7] } } }, 'w'],
                      },
                    },
                  ],
                  default: {
                    $concat: [{ $toString: { $floor: { $divide: ['$$diffInDays', 7] } } }, 'w'],
                  },
                },
              },
            },
          },
        },
      },
      /** Group into Today, This Week, This Month, and Earlier */
      {
        $group: {
          _id: {
            $let: {
              vars: {
                diffInDays: {
                  $floor: { $divide: [{ $subtract: [new Date(), '$createdAt'] }, 86400000] },
                },
              },
              in: {
                $switch: {
                  branches: [
                    {
                      case: { $eq: ['$$diffInDays', 0] },
                      then: 'Today',
                    },
                    {
                      case: { $lte: ['$$diffInDays', 7] },
                      then: 'This Week',
                    },
                    {
                      case: { $lte: ['$$diffInDays', 30] },
                      then: 'This Month',
                    },
                  ],
                  default: 'Earlier',
                },
              },
            },
          },
          notifications: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          notifications: {
            notify: 0,
            createdAt: 0,
            updatedAt: 0,
          },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);
    await User.populate(notifications, { path: 'notifications.user', select: '-_id username pfp' });
    await Comment.populate(notifications, {
      path: 'notifications.comment',
      select: '-_id comment',
    });
    await Post.populate(notifications, { path: 'notifications.post', select: '-_id images' });
    return res.json(notifications);
  } catch (err) {
    console.log(`Get Notifications Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const updateNotifications = async (req, res) => {
  const id = req.user._id;

  try {
    await Notification.updateMany({ notify: id }, { seen: true });
    return res.sendStatus(204);
  } catch (err) {
    console.log(`Update Notification Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getNotifications, updateNotifications };
