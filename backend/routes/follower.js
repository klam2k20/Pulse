const { getFollowers, addFollower, removeFollower } = require('../controllers/follower');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router
  .route('/')
  .get(authenicateToken, getFollowers)
  .post(authenicateToken, addFollower)
  .delete(authenicateToken, removeFollower);

module.exports = router;
