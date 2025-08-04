const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, reminderController.getReminders);
router.post("/", verifyToken, reminderController.addReminder);
router.put("/:id", verifyToken, reminderController.updateReminder);
router.delete("/:id", verifyToken, reminderController.deleteReminder);

module.exports = router;
