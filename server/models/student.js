const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  enrolledCourses: [String],
});

module.exports = mongoose.model("Student", studentSchema);
