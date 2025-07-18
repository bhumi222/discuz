const Student = require("../models/Student");
const Course = require("../models/Course");
const Class = require("../models/Class");
const Event = require("../models/Event");

exports.getDashboardStats = async (req, res) => {
  try {
    const [students, courses, classes, events] = await Promise.all([
      Student.countDocuments(),
      Course.countDocuments(),
      Class.countDocuments(),
      Event.countDocuments(),
    ]);

    res.json({ students, courses, classes, events });
  } catch (error) {
    console.error("Stats Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
