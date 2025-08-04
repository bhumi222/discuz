const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { isAdmin } = require("../middleware/role");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, isAdmin, courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id/students", courseController.getEnrolledStudents);
router.put("/:id", verifyToken, isAdmin, courseController.updateCourse);
router.post("/join/:id", courseController.joinCourse);
router.get("/:id/assignments", courseController.getCourseAssignments);
router.delete("/:id", verifyToken, isAdmin, courseController.deleteCourse);




module.exports = router;
