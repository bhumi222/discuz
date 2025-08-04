const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

// PUT /api/users/profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { first_Name, LastName, photo } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.first_Name = first_Name || user.first_Name;
    user.LastName = LastName || user.LastName;
    user.photo = photo || user.photo;

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        _id: user._id,
        emailId: user.emailId,
        first_Name: user.first_Name,
        LastName: user.LastName,
        role: user.role,
        photo: user.photo
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

module.exports = router;
