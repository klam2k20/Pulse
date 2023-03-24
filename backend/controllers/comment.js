const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  const postId = req.query.postId;

  if (!postId) res.status(400).json({ message: "Missing Post Id" });

  try {
    let commentsWithLikes = await Comment.aggregate([
      { $match: { postId } },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "parentId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          parentId: 1,
          comment: 1,
          createdAt: 1,
          likes: {
            $map: {
              input: "$likes",
              as: "like",
              in: { _id: "$$like._id", userId: "$$like.userId", parentId: "$$like.parentId" },
            },
          },
          user: {
            $map: {
              input: "$user",
              as: "u",
              in: { _id: "$$u._id", username: "$$u.username", pfp: "$$u.pfp" },
            },
          },
        },
      },
    ]);
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
    console.log(`Get Comments: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const postComment = async (req, res) => {
  const { _id: userId } = req.user;
  const { postId, comment } = req.body;

  if (!postId || !comment)
    res
      .status(400)
      .json({ message: "Missing one or more required fields: post id and/or comment" });

  try {
    const newComment = await Comment.create({
      userId,
      postId,
      comment,
    });
    res.json(newComment);
  } catch (err) {
    console.log(`Post Comment Error: ${err}`);
    res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { getComments, postComment };
