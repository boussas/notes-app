const User = require("../models/userModel");

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.signup(fullName, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
};
