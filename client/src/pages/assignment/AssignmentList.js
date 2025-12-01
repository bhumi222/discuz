import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const AssignmentList = () => {
  const [submitted, setSubmitted] = useState([]);
  const [notSubmitted, setNotSubmitted] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    fetch(`${API}/api/assignments?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const withCourse = data.map((a) => ({
            ...a,
            courseTitle: a.courseId?.title || "Untitled Course",
            dueDateObj: new Date(a.dueDate)
          }));

          withCourse.sort((a, b) => a.dueDateObj - b.ddueDateObj);

          const submitted = withCourse.filter(
            (a) => a.status === "Submitted" || a.status === "Marked as Done"
          );
          const notSubmitted = withCourse.filter((a) => a.status === "Assigned");

          setSubmitted(submitted);
          setNotSubmitted(notSubmitted);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch assignments:", err);
      });
  }, [userId]);

  const getBadgeStyle = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-green-100 text-green-700";
      case "Marked as Done":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const renderSection = (title, list) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      {list.length > 0 ? (
        <div className="grid gap-4">
          {list.map((a) => (
            <div
              key={a._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-blue-500 font-medium mb-1">
                  {a.courseTitle}
                </p>
                <h2 className="font-semibold text-lg text-gray-800">{a.title}</h2>
                <p className="text-sm text-gray-400">
                  Due:{" "}
                  {a.dueDate
                    ? new Date(a.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeStyle(
                    a.status
                  )}`}
                >
                  {a.status}
                </span>
                <button
                  onClick={() => navigate(`/assignments/${a._id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No assignments.</p>
      )}
    </div>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Assignments</h1>
      {renderSection("Not Submitted", notSubmitted)}
      {renderSection("Submitted / Marked", submitted)}
    </div>
  );
};

export default AssignmentList;
