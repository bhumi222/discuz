const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = assignmentSchema;
