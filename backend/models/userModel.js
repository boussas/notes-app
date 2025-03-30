const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.signup = async function (fullName, email, password) {
  if (!fullName || !email || !password) {
    throw new Error("All fields are required");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password Weak");
  }
  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new this({
    fullName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, fullName };
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const fullName = user.fullName;
  return { token, fullName };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
