const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/role");

// router.get("/", assignmentController.getAllAssignments); // ✅ NEW
router.get("/", assignmentController.getAssignmentsForUser); // ⚠️ this will now filter by userId
router.get("/:id", assignmentController.getAssignment);
router.put("/:id/submit", verifyToken, upload.single("file"), assignmentController.submitAssignment);
router.put("/:id/unsubmit", verifyToken, assignmentController.unsubmitAssignment);
router.put("/:id/done", verifyToken, assignmentController.markAsDone);

router.post("/:id/private-comment", verifyToken, assignmentController.addPrivateComment);
router.post("/:id/class-comment", verifyToken, assignmentController.addClassComment);

router.post("/:id/upload", upload.array("files", 5), assignmentController.uploadFiles);

router.post("/", verifyToken, isAdmin, upload.single("questionFile"), assignmentController.createAssignment);



module.exports = router;
