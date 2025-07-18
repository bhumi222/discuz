// server/routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Course = require("../models/Course");
const Class = require("../models/Class");
const Activity = require("../models/Activity");

router.get("/stats", async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const courseCount = await Course.countDocuments();
    const classCount = await Class.countDocuments();
    const eventCount = 0; // Add Event model if you have one

    res.json({
      students: studentCount,
      courses: courseCount,
      classes: classCount,
      events: eventCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

router.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ _id: -1 }).limit(10);
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recent activities" });
  }
});

module.exports = router;
