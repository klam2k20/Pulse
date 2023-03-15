const { getPosts } = require("../controllers/post");
const { authenicateToken } = require("../middleware/middleware");

const router = require("express").Router();

router.route("/").get(authenicateToken, getPosts);
router.route("/:username").get(authenicateToken, getPosts);

module.exports = router;
