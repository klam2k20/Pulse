const Post = require("../models/Post");
const User = require("../models/User");
const Like = require("../models/Like");
const Comment = require("../models/Comment");

const getPosts = async (req, res) => {
  let username = req.params.username;

  if (!username) username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Username Not Found" });
    const posts = await Post.find({ userId: user._id }, "-updatedAt -__v -userId").sort({
      createdAt: -1,
    });

    const postsWithLikesAndComments = await Promise.all(
      posts.map(async (p) => {
        const likes = await Like.count({ postId: p._id.toString() });
        const comments = await Comment.count({ postId: p._id.toString() });
        return { ...p._doc, likes, comments };
      })
    );
    return res.json(postsWithLikesAndComments);
  } catch (err) {
    console.log(`Get Posts: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const sharePosts = async (req, res) => {
  const { images, caption } = req.body;
  const username = req.user.username;

  if (!images || !caption)
    return res.status(400).json({
      message: "Missing one or more Required Fields: Images and/or Caption",
    });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const post = await Post.create({
      userId: user._id,
      images,
      caption,
    });
    return res.json(post);
  } catch (err) {
    console.log(`Share Posts: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getPosts, sharePosts };
