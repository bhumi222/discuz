// AppLayout.jsx (parent layout file)
import React from 'react';
import Navbar from './component/navbar/Navbar';
import Sidebar from './component/sidebar/Sidebar';

const AppLayout = ({ children }) => {
  return (
    <div>
      
      <Sidebar />
      <div className="ml-56 mt-16   bg-gray-50 min-h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
