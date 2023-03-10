const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password)
    return res
      .status(400)
      .json({ message: "Missing a required field: name, username, email, or password" });

  try {
    const isUsernameUnique = await User.findOne({ username });
    const isEmailUnique = await User.findOne({ email });
    if (isUsernameUnique) return res.status(409).json({ message: "Username already taken" });
    if (isEmailUnique) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({
      name,
      username,
      email,
      password,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 300 });
    return res.cookie("token", token, { maxAge: 300000 }).json({
      name: user.name,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.log(`Register User: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

const loginUser = async (req, res) => {
  res.send("Login User");
};

module.exports = { registerUser, loginUser };
