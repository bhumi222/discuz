const User = require("../models/User");
const Course = require("../models/course");
const Assignment = require("../models/Assignment");
const Reminder = require("../models/Reminder");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: "admin" });
    const students = totalUsers - adminUsers;

    const courses = await Course.countDocuments();
    const assignments = await Assignment.countDocuments();
    const events = await Reminder.countDocuments({ type: "event" });

    res.json({
      students,
      courses,
      assignments,
      events,
      classes: courses  // or replace with real class count if different
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
