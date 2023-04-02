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
        const likes = await Like.count({ id: p._id.toString(), parentId: undefined });
        const comments = await Comment.count({ id: p._id.toString(), parentId: undefined });
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
    const post = await Post.findById(id, '-updatedAt -__v -userId').sort({
      createdAt: -1,
    });
    if (!post) return res.status(404).json({ message: `Post ${id} Does Not Exist` });

    const likes = await Like.count({ id: post._id.toString(), parentId: undefined });
    const comments = await Comment.count({ id: post._id.toString(), parentId: undefined });

    return res.json({ ...post._doc, likes, comments });
  } catch (err) {
    console.log(`Get Post Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const sharePosts = async (req, res) => {
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
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: `Post ${id} Does Not Exist` });
    if (post.userId.toString() !== userId.toString())
      return res.status(403).json({ message: "Only the Post's Author Can Delete This Post" });
    await Post.deleteOne({ _id: id });
    return res.sendStatus(200);
  } catch (err) {
    console.log(`Delete Post Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getPosts, getPost, sharePosts, deletePost };
