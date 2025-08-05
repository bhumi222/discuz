import React, { useEffect, useState } from "react";
import defaultProfile from "../../assests/noprofile.jpeg";

const StudentDirectory = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7777/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Failed to load courses:", err));
  }, []);

  const openCourseStudents = async (course) => {
    setSelectedCourse(course);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:7777/api/courses/${course._id}/students`);
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error("Failed to fetch students", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Directory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => openCourseStudents(course)}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
            <p className="text-sm text-gray-500">{course.description?.short}</p>
          </div>
        ))}
      </div>

      {/* Modal for students */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Students in {selectedCourse.title}
            </h2>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : students.length > 0 ? (
              <div className="grid gap-4 max-h-[400px] overflow-y-auto">
                {students.map((s) => (
                  <div key={s._id} className="flex items-center gap-4 p-3 border rounded">
                    <img
                      src={s.photo || defaultProfile}
                      alt={s.first_Name}
                      className="w-12 h-12 rounded-full object-cover border"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        {s.first_Name} {s.LastName}
                      </p>
                      <p className="text-sm text-gray-500">{s.email}</p>
                      <p className="text-xs text-gray-400">{s.rollNo}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No students enrolled.</p>
            )}

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setStudents([]);
                }}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentDirectory;
