const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  teacher: String,
  teacherId: String,
  description: {
    short: String,
    long: String
  },
  duration: Number,
  totalMarks: Number,
  passMarks: Number,
  entryCode: {
    type: String,
    unique: true,
    default: () => `CRS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Course", courseSchema);
