import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaUsers, FaChalkboardTeacher, FaFileAlt, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';

const fetchDashboardStats = async () => {
  const response = await axios.get('/api/dashboard/stats');
  return response.data;
};

const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) return <div className="p-6 text-xl">Loading Dashboard...</div>;
  if (isError) return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="Students" value={data.students} icon={<FaUsers />} color="bg-blue-500" />
      <DashboardCard title="Courses" value={data.courses} icon={<FaChalkboardTeacher />} color="bg-green-500" />
      <DashboardCard title="Assignments" value={data.assignments} icon={<FaFileAlt />} color="bg-purple-500" />
      <DashboardCard title="Classes" value={data.classes} icon={<FaClipboardList />} color="bg-yellow-500" />
      <DashboardCard title="Events" value={data.events} icon={<FaCalendarAlt />} color="bg-pink-500" />
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => (
  <div className={`rounded-xl shadow-lg p-6 text-white ${color}`}>
    <div className="flex items-center justify-between">
      <div className="text-2xl">{icon}</div>
      <div className="text-right">
        <h2 className="text-lg">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
