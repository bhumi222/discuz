import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_API_URL;

const CoursePage = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`${API}/api/courses`);
      const allCourses = await res.json();
      const found = allCourses.find(c => c._id === courseId);
      setCourse(found);
    };

    fetchCourse();

    fetch(`${API}/api/courses/${courseId}/assignments`)
      .then((res) => res.json())
      .then(setAssignments)
      .catch((err) => {
        console.error("Failed to load course assignments:", err);
      });
  }, [courseId]);

  const handleDeleteCourse = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`${API}/api/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Course deleted");
        navigate("/courses");
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Server error while deleting");
      console.error(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(course.entryCode);
    toast.success("Copied!");
  };

  const openEditModal = () => {
    setEditData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      totalMarks: course.totalMarks,
      passMarks: course.passMarks
    });
    setShowEditModal(true);
  };

  const handleCourseUpdate = async () => {
    try {
      const res = await fetch(`${API}/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Course updated!");
        setCourse(data.course);
        setShowEditModal(false);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Update error");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {course && (
        <div className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#3B82F6]">{course.title}</h1>
            {course.teacherId === user._id && (
              <button
                onClick={handleDeleteCourse}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            )}
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-600">Teacher: {course.teacher}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span className="font-mono">{course.entryCode}</span>
              <button
                onClick={handleCopy}
                className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />

          <div className="pt-4 row text-sm text-gray-700">
            <div className="col-md-6">
              <p><strong>Duration:</strong> {course.duration} hrs</p>
            </div>
            <div className="col-md-6">
              <p><strong>Marks:</strong> {course.passMarks} / {course.totalMarks}</p>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />

          <div className="pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-1">Short Description</h3>
            <p className="text-gray-600 whitespace-pre-line break-words">{course.description.short}</p>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />

          <div className="pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-1">Long Description</h3>
            <p className="text-gray-600 whitespace-pre-line break-words">{course.description.long}</p>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />

          {course.teacherId === user._id && (
            <div className="pt-4 text-right">
              <button
                onClick={openEditModal}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
              >
                Edit Course
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Assignments</h2>
        {course?.teacherId === user._id && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(`/courses/${course._id}/assignments/new`)}
          >
            + Add Assignment
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {assignments.map((a) => (
          <div key={a._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg text-blue-600">{a.title}</h2>
                <div className="text-sm text-gray-400">
                  <p>Marks: {a.marks}</p>
                  <p>Due: {new Date(a.dueDate).toLocaleDateString()}</p>
                  <p>Status:
                    <span className={`ml-1 font-medium ${a.status === "Submitted" ? "text-green-600" : a.status === "Marked as Done" ? "text-yellow-600" : "text-gray-600"}`}>
                      {a.status}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/assignments/${a._id}`)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md self-start"
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 border rounded mb-2"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Short description"
              className="w-full px-3 py-2 border rounded mb-2"
              value={editData.description.short}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  description: { ...editData.description, short: e.target.value }
                })
              }
            />
            <textarea
              placeholder="Long description"
              className="w-full px-3 py-2 border rounded mb-2"
              value={editData.description.long}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  description: { ...editData.description, long: e.target.value }
                })
              }
            />
            <input
              type="number"
              placeholder="Duration"
              className="w-full px-3 py-2 border rounded mb-2"
              value={editData.duration}
              onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
            />
            <input
              type="number"
              placeholder="Total Marks"
              className="w-full px-3 py-2 border rounded mb-2"
              value={editData.totalMarks}
              onChange={(e) => setEditData({ ...editData, totalMarks: e.target.value })}
            />
            <input
              type="number"
              placeholder="Pass Marks"
              className="w-full px-3 py-2 border rounded mb-4"
              value={editData.passMarks}
              onChange={(e) => setEditData({ ...editData, passMarks: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded text-gray-600">
                Cancel
              </button>
              <button onClick={handleCourseUpdate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
