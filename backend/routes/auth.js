const { loginUser, registerUser, logoutUser } = require('../controllers/auth');

const router = require('express').Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;
