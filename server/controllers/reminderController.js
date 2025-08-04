const Reminder = require("../models/Reminder");
const mongoose = require("mongoose");
 
// GET /api/reminders?userId=some_id
exports.getReminders = async (req, res) => {
  try {
    const rawId = req.query.userId;
    if (!rawId || !mongoose.Types.ObjectId.isValid(rawId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    const userId = new mongoose.Types.ObjectId(rawId);
    const bhumiId = new mongoose.Types.ObjectId("6886376963d7c7bb3f5d5d5f"); // ✅ Bhumi's userId

    const reminders = await Reminder.find({
      $or: [
        { userId },                          // personal reminders for this user
        { type: "event", userId: bhumiId }   // only events created by Bhumi
      ]
    });

    res.json(reminders);
  } catch (err) {
    console.error("Reminder fetch error:", err);
    res.status(500).json({ message: "Error fetching reminders" });
  }
};
 
// Add reminder (personal or event)
exports.addReminder = async (req, res) => {
  try {
    const { userId, text, date, type } = req.body;

    // Only Bhumi can create event reminders
    console.log("req.user.emailId: ",req.user.emailId);
    
    if (type === "event" && req.user.emailId !== "bhumivyas@admin.com") {
      return res.status(403).json({ message: "Only super admin can add events." });
    }

    const reminder = await Reminder.create({ userId, text, date, type });
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: "Error adding reminder" });
  }
};

// Update reminder
exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findById(id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });

    const isOwner = reminder.userId.toString() === req.user.id;
    const isBhumi = req.user.emailId === "bhumivyas@admin.com";

    if (reminder.type === "event" && !isBhumi) {
      return res.status(403).json({ message: "Only Bhumi can edit events" });
    }

    if (reminder.type === "personal" && !isOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    reminder.text = req.body.text || reminder.text;
    await reminder.save();

    res.json(reminder);
  } catch (err) {
    res.status(500).json({ message: "Error updating reminder" });
  }
};

// Delete reminder
exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findById(id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });

    const isOwner = reminder.userId.toString() === req.user.id;
    const isBhumi = req.user.emailId === "bhumivyas@admin.com";

    if (reminder.type === "event" && !isBhumi) {
      return res.status(403).json({ message: "Only Bhumi can delete events" });
    }

    if (reminder.type === "personal" && !isOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await reminder.deleteOne();
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting reminder" });
  }
};
