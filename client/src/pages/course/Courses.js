import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [joiningCourse, setJoiningCourse] = useState(null);
  const [entryCode, setEntryCode] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: {
      short: "",
      long: ""
    },
    duration: "",
    totalMarks: "",
    passMarks: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user?._id;
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:7777/api/courses");
      const data = await res.json();
      const sorted = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
        .sort((a, b) => {
          const aJoined = a.enrolledStudents.includes(userId) || a.teacherId === userId;
          const bJoined = b.enrolledStudents.includes(userId) || b.teacherId === userId;
          return bJoined - aJoined; // joined/owned first
        });

      setCourses(sorted);
    } catch (err) {
      toast.error("Could not load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleJoin = async (courseId) => {
    try {
      const res = await fetch(`http://localhost:7777/api/courses/join/${courseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code: entryCode })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Joined course successfully!");
        setEntryCode("");
        setJoiningCourse(null);
        fetchCourses();
      } else {
        toast.error(data.message || "Join failed");
      }
    } catch (err) {
      toast.error("Request failed");
    }
  };

  const handleAddCourse = async () => {
    const { title, description, duration, totalMarks, passMarks } = newCourse;

    if (
      !title.trim() ||
      !description.short.trim() ||
      !description.long.trim() ||
      !duration ||
      !totalMarks ||
      !passMarks
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:7777/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCourse)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("🎉 Course added successfully!");
        setShowAddModal(false);
        setNewCourse({
          title: "",
          description: { short: "", long: "" },
          duration: "",
          totalMarks: "",
          passMarks: ""
        });
        fetchCourses();
      } else {
        toast.error(data.message || "Course creation failed");
      }
    } catch (err) {
      toast.error("Server error while adding course");
      console.error("Add course error:", err);
    }
  };


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Courses</h1>
        {isAdmin && (
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => setShowAddModal(true)}
          >
            + Add Course
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {courses.map((course) => {
          const isJoined = course.enrolledStudents.includes(userId);
          return (
            <div key={course._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  {course.teacherId === userId && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Owner
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-sm">{course.description.short}</p>
                <p className="text-gray-400 text-sm">Teacher: {course.teacher}</p>
                <p className="text-gray-400 text-sm">Duration: {course.duration} hours</p>
                <p className="text-gray-400 text-sm">Marks: {course.passMarks}/{course.totalMarks}</p>
              </div>
              {course.teacherId === userId || isJoined ? (
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  Open
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => setJoiningCourse(course)}
                >
                  Join
                </button>
              )}

            </div>
          );
        })}
      </div>

      {/* Join Modal */}
      {joiningCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Join {joiningCourse.title}</h2>
            <input
              type="text"
              placeholder="Enter entry code"
              className="w-full px-3 py-2 border rounded mb-4"
              value={entryCode}
              onChange={(e) => setEntryCode(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setJoiningCourse(null)} className="px-4 py-2 border rounded text-gray-600">
                Cancel
              </button>
              <button
                onClick={() => handleJoin(joiningCourse._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
            <input
              type="text"
              placeholder="Course title"
              className="w-full px-3 py-2 border rounded mb-2"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Short description"
              className="w-full px-3 py-2 border rounded mb-2"
              value={newCourse.description.short}
              onChange={(e) => setNewCourse({
                ...newCourse,
                description: { ...newCourse.description, short: e.target.value }
              })}
            />
            <textarea
              placeholder="Long description"
              className="w-full px-3 py-2 border rounded mb-2"
              value={newCourse.description.long}
              onChange={(e) => setNewCourse({
                ...newCourse,
                description: { ...newCourse.description, long: e.target.value }
              })}
            />
            <input
              type="number"
              placeholder="Duration (hours)"
              className="w-full px-3 py-2 border rounded mb-2"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
            />
            <input
              type="number"
              placeholder="Total Marks"
              className="w-full px-3 py-2 border rounded mb-2"
              value={newCourse.totalMarks}
              onChange={(e) => setNewCourse({ ...newCourse, totalMarks: e.target.value })}
            />
            <input
              type="number"
              placeholder="Pass Marks"
              className="w-full px-3 py-2 border rounded mb-4"
              value={newCourse.passMarks}
              onChange={(e) => setNewCourse({ ...newCourse, passMarks: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded text-gray-600">
                Cancel
              </button>
              <button onClick={handleAddCourse} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
