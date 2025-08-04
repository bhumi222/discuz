const Assignment = require("../models/Assignment");
const Course = require("../models/course");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.getAssignmentsForUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const objectId = new mongoose.Types.ObjectId(userId);

    // Get courses where user is either enrolled OR owner (teacher)
    const courses = await Course.find({
      $or: [
        { enrolledStudents: objectId },
        { teacherId: userId } // assuming teacherId is stored as String
      ]
    });

    const courseIds = courses.map((c) => c._id);

    const assignments = await Assignment.find({ courseId: { $in: courseIds } }).populate("courseId", "title");


    res.json(assignments);
  } catch (err) {
    console.error("User assignments error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.unsubmitAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    assignment.status = "Assigned";
    assignment.submittedFile = null;

    await assignment.save();
    res.json({ message: "Assignment unsubmitted", assignment });
  } catch (err) {
    console.error("Unsubmit error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET assignment by ID
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    const userId = req.headers["x-user-id"]; // 👈 Make sure frontend sends this
    const isOwner = assignment.teacherId?.toString() === userId;

    const filteredAssignment = { ...assignment._doc };

    if (!isOwner) {
      // Filter only user's own private comments
      filteredAssignment.privateComments = assignment.privateComments.filter(
        (c) => c.userId?.toString() === userId
      );
    }

    res.json(filteredAssignment);
  } catch (err) {
    console.error("Get Assignment Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


// POST upload file (store filenames only for now)
exports.uploadFiles = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    const fileNames = req.files.map((file) => file.filename);
    assignment.uploadedFiles.push(...fileNames);

    await assignment.save();
    res.json({ message: "Files uploaded", files: assignment.uploadedFiles });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ dueDate: 1 }); // Can filter by user later
    res.json(assignments);
  } catch (err) {
    console.error("Fetch all assignments error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


// PUT submit work
exports.submitAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    // Save submitted file info
    assignment.status = "Submitted";
    assignment.submittedFile = {
      name: req.file.originalname,
      path: req.file.filename,
      uploadedAt: new Date(),
    };

    await assignment.save();
    res.json({ message: "Assignment submitted", assignment });
  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


// PUT mark as done
exports.markAsDone = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    assignment.status = "Marked as Done";
    await assignment.save();
    res.json({ message: "Assignment marked as done", status: assignment.status });
  } catch (err) {
    console.error("Mark Done Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, marks, courseId } = req.body;
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);


    if (!title || !description || !dueDate || !marks || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const questionFile = req.file?.filename || "";
    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      marks,
      courseId,
      questionFile
    });

    res.status(201).json(assignment);
  } catch (err) {
    console.error("Create assignment error:", err);
    res.status(500).json({ message: "Assignment creation failed" });
  }
};

// POST private comment
exports.addPrivateComment = async (req, res) => {
  const { comment, userId, name } = req.body;
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    assignment.privateComments.push({ userId, name, comment });
    await assignment.save();

    res.status(200).json({ message: "Private comment added", assignment });
  } catch (err) {
    console.error("Add private comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST class comment
exports.addClassComment = async (req, res) => {
  const { comment, userId, name } = req.body;
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    assignment.classComments.push({ userId, name, comment });
    await assignment.save();

    res.status(200).json({ message: "Class comment added", assignment });
  } catch (err) {
    console.error("Add class comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
