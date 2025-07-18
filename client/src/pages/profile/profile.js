import React, { useState } from "react";

const student = {
  name: "Bhumi Vyas",
  rollNo: "DS045",
  profileImage: "https://randomuser.me/api/portraits/women/72.jpg",

  // Academic
  enrollmentNo: "ENR202301234",
  course: "BSc Data Science",
  branch: "Computer Applications",
  year: "2nd Year",
  semester: "Semester 4",
  gpa: "8.7",
  attendance: "92%",

  // Contact
  phone: "9876543210",
  email: "bhumi@example.com",
  address: "Ahmedabad, Gujarat, India",
  guardian: "Mr. Ramesh Vyas",
  guardianPhone: "9876501234",

  // Extra
  dob: "15 March 2004",
  bloodGroup: "B+",
  hobbies: "Reading, Painting, Coding",
  studentId: "IDGUBSC123",
};

const tabs = ["Overview", "Academic", "Contact", "Extra Info"];

const StudentProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabClass = (tab) =>
    `px-4 py-3 border-b-4 text-lg ${
      activeTab === tab
        ? "border-blue-600 text-blue-600 font-semibold"
        : "border-transparent text-gray-600 hover:text-blue-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header: Tabs + Edit Button */}
        <div className="flex justify-between items-center px-8 pt-6 border-b">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={tabClass(tab)}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
            Edit Profile
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-10 text-base">
          {activeTab === "Overview" && (
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <img
                src={student.profileImage}
                alt={student.name}
                className="w-40 h-40 rounded-full shadow-md"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {student.name}
                </h2>
                <p className="text-gray-600 text-lg">Roll No: {student.rollNo}</p>
              </div>
            </div>
          )}

          {activeTab === "Academic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <p><strong>Enrollment No:</strong> {student.enrollmentNo}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p><strong>Branch:</strong> {student.branch}</p>
              <p><strong>Year:</strong> {student.year}</p>
              <p><strong>Semester:</strong> {student.semester}</p>
              <p><strong>GPA:</strong> {student.gpa}</p>
              <p><strong>Attendance:</strong> {student.attendance}</p>
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <p><strong>Phone:</strong> {student.phone}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p className="md:col-span-2"><strong>Address:</strong> {student.address}</p>
              <p><strong>Guardian:</strong> {student.guardian}</p>
              <p><strong>Guardian Phone:</strong> {student.guardianPhone}</p>
            </div>
          )}

          {activeTab === "Extra Info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <p><strong>Date of Birth:</strong> {student.dob}</p>
              <p><strong>Blood Group:</strong> {student.bloodGroup}</p>
              <p className="md:col-span-2"><strong>Hobbies:</strong> {student.hobbies}</p>
              <p><strong>Student ID:</strong> {student.studentId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileTabs;
