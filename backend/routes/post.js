const { getPosts, sharePosts, getPost } = require('../controllers/post');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router.route('/').get(authenicateToken, getPosts).post(authenicateToken, sharePosts);
router.route('/:id').get(authenicateToken, getPost);

module.exports = router;
