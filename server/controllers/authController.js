// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Controller
exports.register = async (req, res) => {
  try {
    const { first_Name, LastName, emailId, password, rePassword } = req.body;

    if (!first_Name || !LastName || !emailId || !password || !rePassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== rePassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_Name,
      LastName,
      emailId,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      id: user._id,
      emailId: user.emailId,
      first_Name: user.first_Name,
      LastName: user.LastName,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // true in production
  });
  return res.status(200).json({ message: "Logout successful" });
};
