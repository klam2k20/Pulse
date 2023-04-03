const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

const getPosts = async (req, res) => {
  let username = req.query.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: `${username} Does Not Exist` });
    const posts = await Post.find({ userId: user._id }, '-updatedAt -__v -userId').sort({
      createdAt: -1,
    });

    const postsWithLikesAndComments = await Promise.all(
      posts.map(async (p) => {
        const likes = await Like.count({ postId: p._id.toString(), parentId: undefined });
        const comments = await Comment.count({ postId: p._id.toString(), parentId: undefined });
        return { ...p._doc, likes, comments };
      })
    );
    return res.json(postsWithLikesAndComments);
  } catch (err) {
    console.log(`Get Posts Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const getPost = async (req, res) => {
  let id = req.params.id;

  try {
    const post = await Post.findOne({ _id: id }, '-updatedAt -__v').populate(
      'userId',
      'name username pfp'
    );
    if (!post) return res.status(404).json({ message: `Post ${id} Does Not Exist` });

    const likes = await Like.count({ postId: post._id.toString(), parentId: undefined });
    const comments = await Comment.count({ postId: post._id.toString(), parentId: undefined });

    return res.json({ ...post._doc, likes, comments });
  } catch (err) {
    console.log(`Get Post Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const addPost = async (req, res) => {
  const { images, caption } = req.body;
  const username = req.user.username;

  if (!images || !caption)
    return res.status(400).json({
      message: 'Missing One or More Required Fields: Images and/or Caption',
    });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: `${username} Does Not Exist` });
    const post = await Post.create({
      userId: user._id,
      images,
      caption,
    });
    return res.json(post);
  } catch (err) {
    console.log(`Share Posts Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const deletePost = async (req, res) => {
  const id = req.query.id;
  const userId = req.user._id;

  if (!id) return res.status(400).json({ message: 'Missing a Required Field: Post Id' });

  const session = await mongoose.startSession();
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: `Post ${id} Does Not Exist` });
    if (post.userId.toString() !== userId.toString())
      return res.status(403).json({ message: "Only the Post's Author Can Delete This Post" });

    // Transaction to Delete Post and all Related Comments and Likes
    session.startTransaction();
    await Post.deleteOne({ _id: id }, { session });
    await Like.deleteMany({ postId: id }, { session });
    await Comment.deleteMany({ postId: id }, { session });
    await session.commitTransaction();
    return res.sendStatus(200);
  } catch (err) {
    await session.abortTransaction();
    console.log(`Delete Post Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { images, caption } = req.body;
  if (!images || !caption)
    return res
      .status(400)
      .json({ message: 'Missing One or More Required Fields: Images and/or Caption' });

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: `Post ${id} Does Not Exist` });
    await Post.replaceOne({ _id: id }, { images, caption, userId: post.userId });
    return res.sendStatus(204);
  } catch (err) {
    console.log(`Update Post Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
