const { uploadPhoto } = require("../controllers/upload");
const { authenicateToken } = require("../middleware/middleware");
const multer = require("multer");

const upload = multer();

const router = require("express").Router();

/**
 * multer will intercept incoming requests and parse the inputs
 * to make the available on the req object
 */
router.route("/").post(authenicateToken, upload.single("photo"), uploadPhoto);

module.exports = router;
