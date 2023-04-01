const Like = require('../models/Like');
const Post = require('../models/Post');

const getPostLikes = async (req, res) => {
  const postId = req.query.postId;

  if (!postId) return res.status(400).json({ message: 'Missing a Required Field: Post id' });

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post Not Found' });
    const likes = await Like.find({ postId, parentId: undefined }, 'userId').populate(
      'userId',
      '_id username name pfp'
    );
    return res.json(likes);
  } catch (err) {
    console.log(`Get Post Likes Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const addLike = async (req, res) => {
  const { postId, parentId } = req.body;
  const userId = req.user._id;

  if (!postId) return res.status(400).json({ message: 'Missing a Required Field: Post id' });
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post Not Found' });
    const isLiked = await Like.findOne({ postId, userId, parentId });
    if (isLiked)
      return res
        .status(409)
        .json({ message: parentId ? 'Comment Already Liked' : 'Post Already Liked' });
    const like = await Like.create({
      postId,
      userId,
      parentId,
    });
    return res.json(like);
  } catch (err) {
    console.log(`Add Post Like Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const removeLike = async (req, res) => {
  const { postId, parentId } = req.query;
  const userId = req.user._id;
  if (!postId) return res.status(400).json({ message: 'Missing a Required Field: Post id' });
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post Not Found' });
    const isLiked = await Like.findOne({ postId, userId, parentId });
    if (!isLiked)
      return res
        .status(409)
        .json({ message: parentId ? 'Comment is Not Liked' : 'Post is Not Liked' });
    await Like.deleteOne({
      postId,
      userId,
      parentId,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(`Remove Post Like Error: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getPostLikes, addLike, removeLike };
