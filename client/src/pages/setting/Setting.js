import React, { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Account");

  const tabClass = (tab) =>
    `px-4 py-2 border-b-2 ${
      activeTab === tab
        ? "border-blue-600 text-blue-600 font-semibold"
        : "border-transparent text-gray-600 hover:text-blue-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Tabs Header */}
        <div className="flex justify-between items-center px-6 pt-4 border-b">
          <div className="flex space-x-6">
            <button className={tabClass("Account")} onClick={() => setActiveTab("Account")}>
              Account
            </button>
            <button className={tabClass("Preferences")} onClick={() => setActiveTab("Preferences")}>
              Preferences
            </button>
            <button className={tabClass("Notifications")} onClick={() => setActiveTab("Notifications")}>
              Notifications
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "Account" && (
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block font-medium">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter new password"
                />
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "Preferences" && (
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Theme</label>
                <select className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2">
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Language</label>
                <select className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Gujarati</option>
                </select>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Preferences
              </button>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="email" className="mr-2" />
                <label htmlFor="email">Receive Email Notifications</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="sms" className="mr-2" />
                <label htmlFor="sms">Receive SMS Alerts</label>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Update Notification Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
