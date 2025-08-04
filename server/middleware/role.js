const User = require("../models/User");

exports.isAdmin = async (req, res, next) => {
  const userId = req.user?.id;
  const user = await User.findById(userId);
  if (user && user.role === "admin") return next();
  return res.status(403).json({ message: "Admins only" });
};

exports.isSuperAdmin = async (req, res, next) => {
  const userId = req.user?.id;
  const user = await User.findById(userId);
  if (user && user.emailId === "bhumivyas@admin.com") return next();
  return res.status(403).json({ message: "Only super admin can perform this action" });
};
