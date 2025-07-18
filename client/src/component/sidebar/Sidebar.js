// Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaChalkboardTeacher, FaHome, FaBook, FaUserGraduate,
  FaCalendarAlt, FaCog, FaSignOutAlt
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7777/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-52 bg-gradient-to-b from-blue-500 to-blue-400 text-white shadow-lg rounded-r-3xl z-40 overflow-y-auto">
      <ul className="flex flex-col items-start pt-6 pl-4 space-y-4 text-sm font-medium">

        <li onClick={() => navigate('/dashboard')} className="flex items-center gap-3 hover:bg-blue-500 px-3 py-2 rounded-lg w-full cursor-pointer">
          <FaHome /> Dashboard
        </li>

        <li onClick={() => navigate('/classdetails')} className="flex items-center gap-3 hover:bg-blue-500 px-3 py-2 rounded-lg w-full cursor-pointer">
          <FaChalkboardTeacher /> Classes
        </li>

        <li onClick={() => navigate('/assignment')} className="flex items-center gap-3 hover:bg-blue-500 px-3 py-2 rounded-lg w-full cursor-pointer">
          <FaBook /> Assignments
        </li>

        <li onClick={() => navigate('/studentd')} className="flex items-center gap-3 hover:bg-blue-500 px-3 py-2 rounded-lg w-full cursor-pointer">
          <FaUserGraduate /> Students
        </li>

        <li onClick={() => navigate('/calender')} className="flex items-center gap-3 hover:bg-blue-500 px-3 py-2 rounded-lg w-full cursor-pointer">
          <FaCalendarAlt /> Calendar
        </li>

        <li onClick={() => navigate('/setting')} className="flex items-center gap-3 hover:bg-blue-500 px-3 py-2 rounded-lg w-full cursor-pointer">
          <FaCog /> Settings
        </li>

        <li onClick={handleLogout} className="flex items-center gap-3 hover:bg-blue-700 px-3 py-2 rounded-lg w-full cursor-pointer mt-8">
          <FaSignOutAlt /> Logout
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
