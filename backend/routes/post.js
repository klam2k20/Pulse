const { getPosts, addPost, getPost, deletePost, updatePost } = require('../controllers/post');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router
  .route('/')
  .get(authenicateToken, getPosts)
  .post(authenicateToken, addPost)
  .delete(authenicateToken, deletePost);
router.route('/:id').get(authenicateToken, getPost).put(authenicateToken, updatePost);

module.exports = router;
