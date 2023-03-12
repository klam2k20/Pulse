const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenicateToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401);
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = await User.findById(user.userId).select("-password");
      next();
    });
  } catch (err) {
    console.log(`Authenicate Token: ${err}`);
    next(err);
  }
};

module.exports = { authenicateToken };
