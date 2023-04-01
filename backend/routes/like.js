const { getPostLikes, addLike, removeLike } = require('../controllers/like.js');
const { authenicateToken } = require('../middleware/middleware.js');
const router = require('express').Router();

router
  .route('/')
  .get(authenicateToken, getPostLikes)
  .post(authenicateToken, addLike)
  .delete(authenicateToken, removeLike);

module.exports = router;
