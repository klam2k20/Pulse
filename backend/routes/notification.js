const { getNotifications, updateNotifications } = require('../controllers/notification');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router
  .route('/')
  .get(authenicateToken, getNotifications)
  .put(authenicateToken, updateNotifications);

module.exports = router;
