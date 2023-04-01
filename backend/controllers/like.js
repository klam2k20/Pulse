const Like = require('../models/Like');

//TODO: UPDATE ANY APIS THAT TAKE IN THE USERNAME FOR THE LOGGED IN USER
// CAN INSTEAD JUST USE REQ.USER._ID
const getPostLikes = async (req, res) => {
  const postId = req.query.postId;

  if (!postId) return res.status(400).json({ message: 'Missing required post id' });

  try {
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

const addPostLike = async (req, res) => {
  const { postId, userId, parentId } = req.body;

  if (!postId || !userId)
    return res
      .status(400)
      .json({ message: 'Missing one or more required fields: post and/or user id' });
  try {
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

const removePostLike = async (req, res) => {
  const { postId, userId, parentId } = req.query;
  if (!postId || !userId)
    return res
      .status(400)
      .json({ message: 'Missing one or more required fields: post and/or user id' });
  try {
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

module.exports = { getPostLikes, addPostLike, removePostLike };
