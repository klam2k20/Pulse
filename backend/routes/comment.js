const { getComments } = require("../controllers/comment");
const { authenicateToken } = require("../middleware/middleware");

const router = require("express").Router();

router.route("/").get(authenicateToken, getComments);

module.exports = router;
