const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },

  // For teacher: the assignment question file
  questionFile: String,

  // Student-submitted file (only one allowed)
  submittedFile: {
    name: String,
    path: String,
    uploadedAt: Date
  },

  marks: Number,
  status: {
    type: String,
    enum: ["Assigned", "Submitted", "Marked as Done"],
    default: "Assigned"
  },

  // Class-wide comments with name
  classComments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],

  // Private comments (only visible to owner)
  privateComments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model("Assignment", assignmentSchema);
