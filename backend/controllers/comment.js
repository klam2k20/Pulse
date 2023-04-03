const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Notification = require('../models/Notification');

const getComments = async (req, res) => {
  const postId = req.query.postId;

  if (!postId) res.status(400).json({ message: 'Missing a Required Field: Username' });

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: `Post ${postId} Does Not Exist` });
    let commentsWithLikes = await Comment.aggregate([
      { $match: { postId } },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'parentId',
          as: 'likes',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          parentId: 1,
          comment: 1,
          createdAt: 1,
          likes: {
            $map: {
              input: '$likes',
              as: 'like',
              in: { _id: '$$like._id', userId: '$$like.userId' },
            },
          },
          user: {
            $map: {
              input: '$user',
              as: 'u',
              in: { _id: '$$u._id', username: '$$u.username', pfp: '$$u.pfp' },
            },
          },
        },
      },
    ]);
    await User.populate(commentsWithLikes, {
      path: 'likes.userId',
      select: '_id username name pfp',
    });
    const repliesWithLikes = commentsWithLikes.filter((c) => c.parentId !== undefined);
    commentsWithLikes = commentsWithLikes.filter((c) => c.parentId === undefined);

    let commentsWithLikesAndReplies = commentsWithLikes.map((comment) => {
      const replies = repliesWithLikes.filter((r) => {
        return r.parentId.toString() === comment._id.toString();
      });
      return { ...comment, replies };
    });
    res.send(commentsWithLikesAndReplies);
  } catch (err) {
    console.log(`Get Comments Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const addComment = async (req, res) => {
  const userId = req.user._id;
  const { postId, comment, parentId } = req.body;

  if (!postId || !comment)
    res
      .status(400)
      .json({ message: 'Missing One or More Required Fields: Post id and/or Comment' });

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: `Post ${postId} Does Not Exist` });
    const newComment = await Comment.create({
      userId,
      postId,
      parentId,
      comment,
    });
    if (post.userId.toString() !== userId.toString())
      await Notification.create({
        notify: post.userId,
        user: userId,
        type: 'comment',
        post: postId,
      });
    res.json(newComment);
  } catch (err) {
    console.log(`Post Comment Error: ${err}`);
    res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const deleteComment = async (req, res) => {
  const id = req.query.id;
  const userId = req.user._id;

  if (!id) return res.status(400).json({ message: 'Missing a Required Field: Comment id' });

  const session = await mongoose.startSession();
  try {
    const comment = await Comment.findById(id).populate('postId');
    if (!comment) return res.status(404).json({ message: `Comment ${id} Does Not Exist` });
    if (
      comment.userId.toString() !== userId.toString() &&
      comment.postId.userId.toString() !== userId.toString()
    )
      return res
        .status(403)
        .json({ message: "Only the Post's or Comment's Author Can Delete This Comment" });

    // Transaction to Delete Comment and all Related Replies and Likes
    await session.startTransaction();
    await Comment.deleteOne({ _id: id });
    await Like.deleteMany({ parentId: id });
    const replies = await Comment.find({ parentId: id });
    const replyIds = replies.map((r) => r._id);
    replyIds.forEach(async (id) => await Like.deleteOne({ parentId: id }));
    await Comment.deleteMany({ parentId: id });
    await session.commitTransaction();
    return res.sendStatus(200);
  } catch (err) {
    await session.abortTransaction();
    console.log(`Delete Comment Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getComments, addComment, deleteComment };
