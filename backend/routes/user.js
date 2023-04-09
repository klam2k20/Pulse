const { getProfile, updateProfile, getUsers, getFeed } = require('../controllers/user');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router.route('/').get(authenicateToken, getUsers);
router.route('/feed').get(authenicateToken, getFeed);
router.route('/profile/').get(authenicateToken, getProfile);
router
  .route('/profile/:username')
  .get(authenicateToken, getProfile)
  .put(authenicateToken, updateProfile);

module.exports = router;
