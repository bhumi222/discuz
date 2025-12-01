import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const fetchDashboardStats = async () => {
  const res = await axios.get(`${API}/api/dashboard/stats`, { withCredentials: true });
  return res.data;
};

export const useDashboardStats = () => {
  return useQuery("dashboardStats", fetchDashboardStats);
};
