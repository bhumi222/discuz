const express = require("express");
const userSchema = require('../models/User');
const classSchema = require('../models/class.js')
const assignmentSchema = require('../models/Assignment.js')
const eventSchema= require('../models/event.js')

const router = express.Router();

// Get dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const studentCount = await User.countDocuments({ role: "student" });
    const classCount = await Class.countDocuments();
    const assignmentCount = await Assignment.countDocuments();
    const upcomingEvents = await Event.find({ date: { $gte: new Date() } }).limit(5);

    res.json({
      students: studentCount,
      classes: classCount,
      assignments: assignmentCount,
      events: upcomingEvents
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
});

module.exports = router;
