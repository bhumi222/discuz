// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaUserGraduate, FaBook, FaChalkboardTeacher, FaCalendarAlt, FaPlus,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, count, icon }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition">
    <div className="text-blue-600 text-2xl">{icon}</div>
    <div>
      <div className="text-gray-600 text-sm">{title}</div>
      <div className="text-xl font-bold">{count}</div>
    </div>
  </div>
);

const ActivityItem = ({ user, action, time }) => (
  <div className="border-b py-2">
    <p className="text-sm text-gray-700">
      <span className="font-semibold">{user}</span> {action}
    </p>
    <p className="text-xs text-gray-500">{time}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ students: 0, courses: 0, classes: 0, events: 0 });
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  axios.get("http://localhost:7777/dashboard/stats")
    .then(res => console.log(res.data))
    .catch(err => console.error(err));

  axios.get("http://localhost:7777/dashboard/activities")
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}, []);

  const handleAddStudent = () => navigate('/add-student');
  const handleCreateClass = () => navigate('/add-class');
  const handleUploadMaterial = () => navigate('/upload-material');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Students" count={stats.students} icon={<FaUserGraduate />} />
        <DashboardCard title="Courses" count={stats.courses} icon={<FaBook />} />
        <DashboardCard title="Classes" count={stats.classes} icon={<FaChalkboardTeacher />} />
        <DashboardCard title="Events" count={stats.events} icon={<FaCalendarAlt />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {activities.map((act, idx) => (
              <ActivityItem key={idx} user={act.user} action={act.action} time={act.time} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Upcoming Schedule</h3>
          <ul className="text-sm text-gray-700 space-y-3">
            <li className="flex justify-between border-b pb-2">
              <span>No upcoming events</span>
              <span className="text-gray-500">-</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={handleAddStudent}
          className="flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add Student
        </button>

        <button
          onClick={handleCreateClass}
          className="flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Create Class
        </button>

        <button
          onClick={handleUploadMaterial}
          className="flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Upload Material
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
