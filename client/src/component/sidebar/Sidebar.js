import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaChalkboardTeacher, FaHome, FaBook, FaUserGraduate,
  FaCalendarAlt, FaSignOutAlt, FaLayerGroup
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: <FaHome />, text: "Dashboard", path: "/dashboard" },
    { icon: <FaLayerGroup />, text: "Courses", path: "/courses" },
    { icon: <FaBook />, text: "Assignments", path: "/assignments" },
    { icon: <FaUserGraduate />, text: "Students", path: "/studentd" },
    { icon: <FaCalendarAlt />, text: "Calendar", path: "/calendar" },
  ];

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-56 bg-gradient-to-b from-blue-600 to-blue-400 text-white shadow-lg rounded-r-3xl z-40 overflow-y-auto">
      <div className="px-4 pt-6 pb-2 text-sm uppercase tracking-wide text-white font-bold opacity-80">
        Navigation
      </div>

      <ul className="flex flex-col items-start pl-4 pr-3 space-y-2 text-sm font-medium">
        {navItems.map(({ icon, text, path }) => (
          <li
            key={text}
            onClick={() => navigate(path)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full cursor-pointer transition duration-200 ${
              isActive(path)
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-500"
            }`}
          >
            <span className="text-lg">{icon}</span> {text}
          </li>
        ))}

        <div className="w-full border-t border-white opacity-20 my-3" />

        <li
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg w-full cursor-pointer hover:bg-red-500 transition duration-200"
        >
          <FaSignOutAlt className="text-lg" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
