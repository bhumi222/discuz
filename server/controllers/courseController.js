const Course = require("../models/course");
const Assignment = require("../models/Assignment");
const mongoose = require("mongoose");
const User = require("../models/User");

// List all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

// GET /courses/:id/students
// GET /courses/:id/students
exports.getEnrolledStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "enrolledStudents",
      "first_Name LastName email contact rollNo photo"  // ✅ include all needed fields
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ students: course.enrolledStudents });
  } catch (err) {
    console.error("Get enrolled students error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Delete course error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration, totalMarks, passMarks } = req.body;
    const user = await User.findById(req.user.id); // req.user is available from verifyToken

    const course = await Course.create({
      title,
      teacher: `${user.first_Name} ${user.LastName}`,
      teacherId: user._id.toString(),
      description,
      duration,
      totalMarks,
      passMarks
      // entryCode auto-generated
    });

    res.status(201).json(course);
  } catch (err) {
    console.error("Create course error:", err);
    res.status(500).json({ message: "Failed to create course" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only the owner can update
    if (course.teacherId !== req.user.id) {
      return res.status(403).json({ message: "You are not the course owner" });
    }

    const { title, description, duration, totalMarks, passMarks } = req.body;

    course.title = title;
    course.description = description;
    course.duration = duration;
    course.totalMarks = totalMarks;
    course.passMarks = passMarks;

    await course.save();
    res.json({ message: "Course updated", course });
  } catch (err) {
    console.error("Update course error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};


// Join course with entry code
exports.joinCourse = async (req, res) => {
  const { userId, code } = req.body;
  const courseId = req.params.id;

  console.log("JOIN REQUEST:", { courseId, userId, code });

  try {
    const course = await Course.findById(courseId);
    console.log("COURSE FROM DB:", course);

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.entryCode) {
      console.error("Course missing entryCode field!");
      return res.status(500).json({ message: "Course entryCode missing" });
    }

    if (course.entryCode !== code) {
      console.warn(`Wrong entryCode. Expected: ${course.entryCode}, Got: ${code}`);
      return res.status(400).json({ message: "Invalid entry code" });
    }

    const alreadyEnrolled = course.enrolledStudents.some(
      (id) => id.toString() === userId
    );

    if (!alreadyEnrolled) {
      console.log("✅ Enrolling user:", userId);
      course.enrolledStudents.push(new mongoose.Types.ObjectId(userId));
      await course.save();
    } else {
      console.log("User already enrolled.");
    }

    res.json({ message: "Joined course", courseId });
  } catch (err) {
    console.error("🔥 JOIN COURSE ERROR:", err);
    res.status(500).json({ message: "Join failed", error: err.message, stack: err.stack });
  }
};




// Get assignments by course
exports.getCourseAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.id });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Error loading assignments" });
  }
};
