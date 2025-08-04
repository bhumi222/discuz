const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // e.g., "Mon Jul 29 2025"
  text: { type: String, required: true },
  type: {
    type: String,
    enum: ["personal", "event"],
    default: "personal"
  }
}, { timestamps: true });

module.exports = mongoose.model("Reminder", reminderSchema);
