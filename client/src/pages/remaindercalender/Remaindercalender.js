import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaBell } from "react-icons/fa";
import { toast } from "react-toastify";

const ReminderCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [remainders, setRemainders] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleDateChange = (date) => {
    const today = new Date();
    const selected = new Date(date);
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      toast.warning("🚫 Cannot set reminder for past dates!");
      return;
    }

    setSelectedDate(date);
    setInputText(remainders[date.toDateString()] || "");
    setShowPopup(true);
  };

  const handleSave = () => {
    setRemainders({
      ...remainders,
      [selectedDate.toDateString()]: inputText,
    });
    setInputText("");
    setShowPopup(false);
  };

  const tileContent = ({ date, view }) => {
    const key = date.toDateString();
    if (view === "month" && remainders[key]) {
      return (
        <div className="text-center text-yellow-500 mt-1">
          <FaBell />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">📅 Reminder Calendar</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl justify-center">
        <div className="bg-white p-6 rounded-lg shadow">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            calendarType="gregory"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow w-full lg:w-1/2">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📝 All Reminders</h2>
          {Object.keys(remainders).length === 0 ? (
            <p className="text-gray-500">No reminders yet.</p>
          ) : (
            <ul className="space-y-3">
              {Object.entries(remainders).map(([date, text], idx) => (
                <li key={idx} className="border-b pb-2">
                  <p className="text-blue-600 font-semibold">{date}</p>
                  <p className="text-gray-700">{text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-blue-400 shadow-xl rounded-lg p-6 w-[350px] animate-fadeIn">
            <h3 className="text-md font-semibold text-blue-600 mb-2 flex items-center gap-2">
              <FaBell /> Set Reminder for {selectedDate.toDateString()}
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
              rows={4}
              placeholder="Type your reminder..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSave}
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

export default ReminderCalendar;
