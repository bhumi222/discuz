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
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Promote Bhumi to admin automatically
    if (user.emailId === "bhumivyas@admin.com" && user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }

    // ✅ FIXED: Include emailId in token payload
    const token = jwt.sign(
      {
        id: user._id,
        emailId: user.emailId  // ✅ THIS is what backend needs
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.json({
  token,
  user: {
    _id: user._id,
    emailId: user.emailId,
    first_Name: user.first_Name,
    LastName: user.LastName,
    role: user.role,
    photo: user.photo || "" // ✅ added image
  }
});

  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
