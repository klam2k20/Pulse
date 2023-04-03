const { getProfile, updateProfile } = require('../controllers/user');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router.route('/').get(authenicateToken, getProfile);
router.route('/:username').get(authenicateToken, getProfile).put(authenicateToken, updateProfile);

module.exports = router;
