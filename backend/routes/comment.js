const { getComments, postComment } = require("../controllers/comment");
const { authenicateToken } = require("../middleware/middleware");

const router = require("express").Router();

router.route("/").get(authenicateToken, getComments).post(authenicateToken, postComment);

module.exports = router;
