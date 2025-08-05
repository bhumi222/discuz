const User = require("../models/User");

exports.isAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (user && user.role === "admin") return next();
    return res.status(403).json({ message: "Admins only" });
  } catch (err) {
    console.error("isAdmin middleware error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.isSuperAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (user && user.emailId === "bhumivyas@admin.com") return next();
    return res.status(403).json({ message: "Only super admin can perform this action" });
  } catch (err) {
    console.error("isSuperAdmin middleware error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
