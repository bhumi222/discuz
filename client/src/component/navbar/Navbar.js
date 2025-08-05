import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import defaultProfile from "../../assests/noprofile.jpeg";
import { useNavigate } from "react-router-dom";
import logo from "../../assests/logo.jpg";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-blue-500 shadow-md z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className=" border-4 border-sky-500 h-12 rounded object-cover" />
        {/* <h1 className="text-white font-bold text-xl">Discuz</h1> */}
      </div>


      {/* Profile section */}
      <div className="relative">
        <img
          src={user.photo || defaultProfile}
          alt="Profile"
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {user.first_Name} {user.LastName}
            </h3>
            <p className="text-sm text-gray-600">{user.emailId}</p>
            <p className="text-sm text-blue-500 font-semibold capitalize">{user.role}</p>

            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
