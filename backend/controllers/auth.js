const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECONDS_IN_DAY = 86400;
const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password)
    return res
      .status(400)
      .json({ message: "Missing a Required Field: Name, Username, Email, or Password" });

  try {
    const isUsernameUnique = await User.findOne({ username });
    const isEmailUnique = await User.findOne({ email });
    if (isUsernameUnique) return res.status(409).json({ message: "Username Already Taken" });
    if (isEmailUnique) return res.status(409).json({ message: "Email Already Registered" });
    const user = await User.create({
      name,
      username,
      email,
      password,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: SECONDS_IN_DAY,
    });
    return res.cookie("token", token, { maxAge: SECONDS_IN_DAY * 1000 }).json({
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
  const type = emailRegex.test(login) ? "Email" : "Username";
  if (!login || !password)
    return res.status(400).json({ message: `Missing a Required Field: ${type} or Password` });

  try {
    const user =
      type === "Email"
        ? await User.findOne({ email: login })
        : await User.findOne({ username: login });
    if (user && (await user.validatePassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: SECONDS_IN_DAY,
      });
      return res.cookie("token", token, { maxAge: SECONDS_IN_DAY * 1000 }).json({
        name: user.name,
        username: user.username,
        email: user.email,
        token: token,
      });
    }
    return res.status(401).json({ message: `Invalid ${type} or Password` });
  } catch (err) {
    console.log(`Login User: ${err}`);
    return res.status(500).json({ message: `Database Error: ${err}` });
  }
};

module.exports = { registerUser, loginUser };
