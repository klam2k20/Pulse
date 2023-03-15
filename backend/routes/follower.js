const { getFollowers } = require("../controllers/follower");
const { authenicateToken } = require("../middleware/middleware");

const router = require("express").Router();

router.route("/").get(authenicateToken, getFollowers);
router.route("/:username").get(authenicateToken, getFollowers);

module.exports = router;
