const getUserProfile = (req, res) => {
  return res.json(req.user);
};

module.exports = { getUserProfile };
