const getNotifications = require('../controllers/notification');
const { authenicateToken } = require('../middleware/middleware');

const router = require('express').Router();

router.route('/:username').get(authenicateToken, getNotifications);

module.exports = router;
