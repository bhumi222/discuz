import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import ErrorPage from './pages/ErrorPage'; 

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
    { path: '/', element: <Login />, errorElement: <ErrorPage /> },
    { path: '/Registration', element: <Registration />, errorElement: <ErrorPage /> },
    { path: '/rough', element: <Rough />, errorElement: <ErrorPage /> },
    {
      path: '/about',
      element: <Layout><About /></Layout>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/dashboard',
      element: <Layout><Dashboard /></Layout>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/classdetails',
      element: <Layout><ClassDetails /></Layout>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/calender',
      element: <Layout><ReminderCalendar /></Layout>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/contact',
      element: <Layout><Contact /></Layout>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/assignment',
      element: <Layout><AssignmentPage /></Layout>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/studentd',
      element: <Layout><StudentDirectory /></Layout>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/profile',
      element: <Layout><Profile /></Layout>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/setting',
      element: <Layout><SettingsPage theme={theme} setTheme={setTheme} /></Layout>,
      errorElement: <ErrorPage />,
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
