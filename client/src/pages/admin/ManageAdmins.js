import React, { useEffect, useState } from "react";
import { FaUserShield, FaUser, FaSearch, FaTrashAlt, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageAdmins = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:7777/api/users/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        // ✅ Exclude Bhumi
        const filtered = data.filter(u => u.emailId !== "bhumivyas@admin.com");
        setUsers(filtered);
      }
    } catch {
      toast.error("Failed to load users");
    }
  };

  const handleRoleChange = async (user, makeAdmin) => {
    try {
      const res = await fetch(`http://localhost:7777/api/users/${user._id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: makeAdmin ? "admin" : "student" })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`${user.first_Name} is now ${makeAdmin ? "an admin" : "a student"}`);
        fetchUsers();
      } else {
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) =>
    `${u.first_Name} ${u.LastName}`.toLowerCase().includes(query.toLowerCase()) ||
    u.emailId.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2">
        <FaUserShield /> Manage Admins
      </h1>

      <div className="mb-4 flex items-center gap-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full max-w-sm"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((user) => (
          <div key={user._id} className="flex items-center justify-between border p-4 rounded bg-white shadow-sm">
            <div>
              <p className="font-semibold text-gray-800">{user.first_Name} {user.LastName}</p>
              <p className="text-sm text-gray-500">{user.emailId}</p>
              <p className="text-xs text-blue-500">{user.role}</p>
            </div>
            {user.role === "admin" ? (
              <button
                onClick={() => handleRoleChange(user, false)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
              >
                <FaTrashAlt /> Remove Admin
              </button>
            ) : (
              <button
                onClick={() => handleRoleChange(user, true)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
              >
                <FaPlus /> Make Admin
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAdmins;
