const { loginUser, registerUser } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", registerUser).post("/login", loginUser);

module.exports = router;
