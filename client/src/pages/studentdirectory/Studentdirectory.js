import React, { useState } from "react";

const students = [
  {
    id: 1,
    name: "Aarav Mehta",
    rollNo: "DS001",
    email: "aarav.mehta@example.com",
    course: "BSc Data Science",
    year: "2nd Year",
    contact: "9876543210",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ishita Shah",
    rollNo: "DS002",
    email: "ishita.shah@example.com",
    course: "BSc Data Science",
    year: "2nd Year",
    contact: "9876501234",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const StudentDirectory = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Directory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => setSelectedStudent(student)}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <p className="text-lg font-semibold text-gray-800">{student.name}</p>
            <p className="text-sm text-gray-500">{student.rollNo}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex flex-col items-center space-y-4">
              <img
                src={selectedStudent.photo}
                alt={selectedStudent.name}
                className="w-24 h-24 rounded-full shadow-md"
              />
              <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
              <p className="text-sm text-gray-500">{selectedStudent.rollNo}</p>
              <div className="text-gray-700 text-sm text-left w-full space-y-1">
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Course:</strong> {selectedStudent.course}</p>
                <p><strong>Year:</strong> {selectedStudent.year}</p>
                <p><strong>Contact:</strong> {selectedStudent.contact}</p>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
