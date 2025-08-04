import React from 'react';
import { FaUserGraduate, FaEdit, FaPlus, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';

const students = [
  { name: "Aarav Mehta", email: "aarav@example.com" },
  { name: "Riya Shah", email: "riya@example.com" },
  { name: "Yash Patel", email: "yash@example.com" },
];

const materials = [
  { title: "Algebra Basics", type: "PDF", link: "#" },
  { title: "Lecture 1 - Video", type: "Video", link: "#" },
];

const assignments = [
  { title: "Homework 1", due: "June 22" },
  { title: "Test: Algebra", due: "June 25" },
];

const ClassDetails = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Class 10A - Mathematics</h2>
          <p className="text-gray-600">Teacher: Mr. Raj Sharma</p>
          <p className="text-gray-600">Schedule: Mon-Wed-Fri • 10:00 AM</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">
          <FaEdit className="mr-2" /> Edit Class
        </button>
      </div>

      {/* Students */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Enrolled Students</h3>
          <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            <FaPlus className="mr-1" /> Add Student
          </button>
        </div>
        <ul className="space-y-2">
          {students.map((s, index) => (
            <li key={index} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-3">
                <FaUserGraduate className="text-blue-500" />
                <span>{s.name}</span>
              </div>
              <span className="text-sm text-gray-500">{s.email}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Class Materials */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Class Materials</h3>
          <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            <FaPlus className="mr-1" /> Upload Material
          </button>
        </div>
        <ul className="space-y-2">
          {materials.map((m, i) => (
            <li key={i} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <FaFileAlt className="text-gray-600" />
                <a href={m.link} className="text-blue-600 hover:underline">{m.title}</a>
              </div>
              <span className="text-sm text-gray-500">{m.type}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Assignments or Events */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Upcoming Assignments</h3>
        <ul className="space-y-2">
          {assignments.map((a, i) => (
            <li key={i} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-500" />
                <span>{a.title}</span>
              </div>
              <span className="text-sm text-gray-500">Due: {a.due}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassDetails;
