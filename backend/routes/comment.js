const { getComments } = require("../controllers/comment");

const router = require("express").Router();

router.route("/:postId").get(getComments);

module.exports = router;
