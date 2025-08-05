const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: String,
  description: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Class", classSchema);
