const { getPostLikes, addPostLike, removePostLike } = require("../controllers/like.js");
const { authenicateToken } = require("../middleware/middleware.js");
const router = require("express").Router();

router
  .route("/")
  .get(authenicateToken, getPostLikes)
  .post(authenicateToken, addPostLike)
  .delete(authenicateToken, removePostLike);

module.exports = router;
