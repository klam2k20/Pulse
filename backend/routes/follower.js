const { getFollowers, addFollowed, removeFollowed } = require('../controllers/follower');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router
  .route('/')
  .get(authenicateToken, getFollowers)
  .post(authenicateToken, addFollowed)
  .delete(authenicateToken, removeFollowed);

module.exports = router;
