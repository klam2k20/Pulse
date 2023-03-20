const { getPosts, sharePosts } = require("../controllers/post");
const { authenicateToken } = require("../middleware/middleware");

const router = require("express").Router();

router.route("/").get(authenicateToken, getPosts).post(authenicateToken, sharePosts);
router.route("/:username").get(authenicateToken, getPosts);

module.exports = router;
