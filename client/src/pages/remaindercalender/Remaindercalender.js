import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaBell, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_API_URL;

const ReminderCalendar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isBhumi = user?.emailId === "bhumivyas@admin.com";

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [inputText, setInputText] = useState("");

  const fetchReminders = async () => {
    try {
      const res = await fetch(`${API}/api/reminders?userId=${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setReminders(data);
      } else {
        setReminders([]);
      }
    } catch {
      setReminders([]);
      toast.error("Failed to load reminders");
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

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

    const match = reminders.find(
      (r) => r.date === date.toDateString() && r.userId?.toString() === user._id && r.type === "personal"
    );

    if (match) {
      setEditingReminder(match);
      setInputText(match.text);
    } else {
      setEditingReminder(null);
      setInputText("");
    }
    setShowPopup(true);
  };

  const handleSave = async () => {
    const dateKey = selectedDate.toDateString();

    try {
      let res;
      if (editingReminder && editingReminder._id) {
        res = await fetch(`${API}/api/reminders/${editingReminder._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ text: inputText })
        });
      } else {
        res = await fetch(`${API}/api/reminders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            text: inputText,
            date: dateKey,
            userId: user._id,
            type: isBhumi ? "event" : "personal"
          })
        });
      }

      if (res.ok) {
        toast.success("Reminder saved!");
        fetchReminders();
        setShowPopup(false);
      } else {
        toast.error("Failed to save");
      }
    } catch {
      toast.error("Error saving reminder");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/api/reminders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        toast.success("Deleted");
        fetchReminders();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Delete error");
    }
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dateStr = date.toDateString();

    const hasPersonal = reminders.some(
      (r) => r.date === dateStr && r.userId?.toString() === user._id && r.type === "personal"
    );

    const hasEvent = reminders.some((r) => r.date === dateStr && r.type === "event");

    return (
      <div className="flex justify-center items-center mt-1 gap-1 text-sm">
        {hasPersonal && <FaBell className="text-yellow-500" />}
        {hasEvent && <FaBell className="text-blue-500" />}
      </div>
    );
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

          {reminders.length === 0 ? (
            <p className="text-gray-500">No reminders yet.</p>
          ) : (
            <ul className="space-y-3">
              {reminders
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((r) => (
                  <li key={r._id} className="border-b pb-2 relative">
                    <p className={`font-semibold ${r.type === "event" ? "text-blue-600" : "text-yellow-600"}`}>
                      {r.date}
                    </p>
                    <p className="text-gray-700">{r.text}</p>

                    {(r.type === "personal" && r.userId?.toString() === user._id) ||
                    (r.type === "event" && isBhumi) ? (
                      <div className="absolute right-2 top-2 flex gap-2">
                        <FaEdit
                          className="text-gray-500 cursor-pointer hover:text-blue-600"
                          onClick={() => {
                            setSelectedDate(new Date(r.date));
                            setInputText(r.text);
                            setEditingReminder(r);
                            setShowPopup(true);
                          }}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => handleDelete(r._id)}
                        />
                      </div>
                    ) : null}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">
              Set Reminder for {selectedDate.toDateString()}
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows={4}
              placeholder="Type your reminder..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
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

export default ReminderCalendar;
