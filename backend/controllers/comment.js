const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  let postId = req.params.postId;
  const comments = await Comment.find({ postId });
  return res.json(comments);
};

module.exports = { getComments };
