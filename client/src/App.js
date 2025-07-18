import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Navbar from './component/navbar/Navbar';
import Registration from './pages/auth/Registration';
import Login from './pages/auth/Login';
import Rough from './pages/rough/Rough';
import Sidebar from './component/sidebar/Sidebar';
import Layout from './Layout';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Dashboard from './pages/dashboard/Dashboard';
import ClassDetails from './pages/classdetails/classDetails';
import AssignmentPage from './pages/assignment/Assignmentpage';
import StudentDirectory from './pages/studentdirectory/Studentdirectory';
import Profile from './pages/profile/profile';
import SettingsPage from './pages/setting/Setting';
import ReminderCalendar from './pages/remaindercalender/Remaindercalender';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/Registration', element: <Registration /> },
    { path: '/rough', element: <Rough /> },
    {
      path: '/about',
      element: <Layout><About /></Layout>,
    },
    {
      path: '/dashboard',
      element: <Layout><Dashboard /></Layout>,
    },
    {
      path: '/classdetails',
      element: <Layout><ClassDetails /></Layout>,
    },
    {
      path: '/calender',
      element: <Layout><ReminderCalendar /></Layout>,
    },
    {
      path: '/contact',
      element: <Layout><Contact /></Layout>,
    },
    {
      path: '/assignment',
      element: <Layout><AssignmentPage /></Layout>,
    },
    {
      path: '/studentd',
      element: <Layout><StudentDirectory /></Layout>,
    },
    {
      path: '/profile',
      element: <Layout><Profile /></Layout>,
    },
    {
      path: '/setting',
      element: <Layout><SettingsPage theme={theme} setTheme={setTheme} /></Layout>,
    },
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
