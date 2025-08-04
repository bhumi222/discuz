import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & Wrappers
import Layout from './Layout';
import PublicRoute from './component/PublicRoute';
import PrivateRoute from './component/PrivateRoute';

// Pages
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import Dashboard from './pages/dashboard/Dashboard';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import ClassDetails from './pages/classdetails/classDetails';
import AssignmentList from './pages/assignment/AssignmentList';
import AssignmentPage from './pages/assignment/Assignmentpage';
import StudentDirectory from './pages/studentdirectory/Studentdirectory';
import Profile from './pages/profile/profile';
import SettingsPage from './pages/setting/Setting';
import ReminderCalendar from './pages/remaindercalender/Remaindercalender';
import Rough from './pages/rough/Rough';
import Courses from './pages/course/Courses';
import CoursePage from './pages/course/CoursePage';
import AddAssignment from "./pages/assignment/AddAssignment";

function App() {
  return (
    <Routes>
      {/* 🔓 Public routes */}
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/registration" element={<PublicRoute><Registration /></PublicRoute>} />

      {/* 🔒 Private routes */}
      <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path="/about" element={<PrivateRoute><Layout><About /></Layout></PrivateRoute>} />
      <Route path="/contact" element={<PrivateRoute><Layout><Contact /></Layout></PrivateRoute>} />
      <Route path="/classdetails" element={<PrivateRoute><Layout><ClassDetails /></Layout></PrivateRoute>} />
      <Route
        path="/assignments"
        element={<PrivateRoute><Layout><AssignmentList /></Layout></PrivateRoute>}
      />
      <Route
        path="/assignments/:id"
        element={<PrivateRoute><Layout><AssignmentPage /></Layout></PrivateRoute>}
      />
      <Route
        path="/courses"
        element={<PrivateRoute><Layout><Courses /></Layout></PrivateRoute>}
      />

      <Route
        path="/courses/:id/assignments/new"
        element={<PrivateRoute><Layout><AddAssignment /></Layout></PrivateRoute>}
      />

      <Route
        path="/courses/:id"
        element={<PrivateRoute><Layout><CoursePage /></Layout></PrivateRoute>}
      />
      <Route path="/studentd" element={<PrivateRoute><Layout><StudentDirectory /></Layout></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
      <Route path="/setting" element={<PrivateRoute><Layout><SettingsPage /></Layout></PrivateRoute>} />
      <Route path="/calendar" element={<PrivateRoute><Layout><ReminderCalendar /></Layout></PrivateRoute>} />
      <Route path="/rough" element={<Rough />} />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss={false}
        theme="light"
      />
    </Router>
  );
}
