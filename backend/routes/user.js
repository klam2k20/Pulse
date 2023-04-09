const { getProfile, updateProfile, getUsers } = require('../controllers/user');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router.route('/').get(authenicateToken, getUsers);
router.route('/profile/').get(authenicateToken, getProfile);
router
  .route('/profile/:username')
  .get(authenicateToken, getProfile)
  .put(authenicateToken, updateProfile);

module.exports = router;
