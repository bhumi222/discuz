import React, { useEffect, useState } from 'react';
import { FaUsers, FaChalkboardTeacher, FaFileAlt, FaClipboardList, FaCalendarAlt, FaUserCircle, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../assests/noprofile.jpeg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API}/api/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch dashboard stats');

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          first_Name: editedUser.first_Name,
          LastName: editedUser.LastName,
          photo: editedUser.photo
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated");
        localStorage.setItem("user", JSON.stringify(data.user));
        setShowProfilePopup(false);
        window.location.reload();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (loading) return <div className="p-6 text-xl">Loading Dashboard...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
        <div className="flex items-center gap-6">
          {user?.photo ? (
            <img
              src={user.photo}
              alt={user.first_Name || "User"}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-5xl text-gray-500" />
          )}

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Welcome, {user.first_Name} {user.LastName}
            </h2>
            <p className="text-gray-600">{user.emailId}</p>
            <p className="text-sm text-blue-500 capitalize font-semibold">{user.role}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditedUser(user);
            setShowProfilePopup(true);
          }}
          className="text-sm flex items-center gap-2 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          <FaEdit /> Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Students" value={data.students} icon={<FaUsers />} onClick={null} />
        <DashboardCard title="Courses" value={data.courses} icon={<FaChalkboardTeacher />} onClick={() => navigate("/courses")} />
        <DashboardCard title="Assignments" value={data.assignments} icon={<FaFileAlt />} onClick={() => navigate("/assignments")} />
        <DashboardCard title="Classes" value={data.classes} icon={<FaClipboardList />} onClick={null} />
        <DashboardCard title="Events" value={data.events} icon={<FaCalendarAlt />} onClick={() => navigate("/calendar")} />
      </div>

      {showProfilePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

            <input
              type="text"
              className="w-full border p-2 mb-3 rounded"
              placeholder="First Name"
              value={editedUser.first_Name}
              onChange={(e) => setEditedUser({ ...editedUser, first_Name: e.target.value })}
            />
            <input
              type="text"
              className="w-full border p-2 mb-3 rounded"
              placeholder="Last Name"
              value={editedUser.LastName}
              onChange={(e) => setEditedUser({ ...editedUser, LastName: e.target.value })}
            />
            <input
              type="text"
              className="w-full border p-2 mb-3 rounded"
              placeholder="Profile Picture URL"
              value={editedUser.photo || ""}
              onChange={(e) => setEditedUser({ ...editedUser, photo: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowProfilePopup(false)}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardCard = ({ title, value, icon, onClick }) => (
  <div
    onClick={onClick}
    className="rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition cursor-pointer border hover:border-blue-400"
  >
    <div className="flex items-center justify-between">
      <div className="text-3xl text-blue-600">{icon}</div>
      <div className="text-right">
        <h2 className="text-md font-semibold text-gray-600">{title}</h2>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
