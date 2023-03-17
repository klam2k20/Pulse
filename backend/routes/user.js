const { getUserProfile, updateUserProfile } = require("../controllers/user");
const { authenicateToken } = require("../middleware/middleware");

const router = require("express").Router();

router.route("/").get(authenicateToken, getUserProfile);
router
  .route("/:username")
  .get(authenicateToken, getUserProfile)
  .put(authenicateToken, updateUserProfile);

module.exports = router;
