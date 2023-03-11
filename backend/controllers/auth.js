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
  const { login, password } = req.body;

  const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
  const type = emailRegex.test(login) ? "email" : "username";
  if (!login || !password)
    return res.status(400).json({ message: `Missing a required field: ${type} or password` });

  try {
    const user =
      type === "email"
        ? await User.findOne({ email: login })
        : await User.findOne({ username: login });
    if (user && (await user.validatePassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 300 });
      return res.cookie("token", token).json({
        name: user.name,
        username: user.username,
        email: user.email,
        token: token,
      });
    }
    return res.status(401).json({ message: `Invalid ${type} or password` });
  } catch (err) {
    console.log(`Login User: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { registerUser, loginUser };
