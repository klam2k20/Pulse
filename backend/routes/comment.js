const { getComments, addComment, deleteComment } = require('../controllers/comment');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router
  .route('/')
  .get(authenicateToken, getComments)
  .post(authenicateToken, addComment)
  .delete(authenicateToken, deleteComment);

module.exports = router;
