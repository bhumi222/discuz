import React, { useState } from "react";

const AssignmentPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [status, setStatus] = useState("Assigned"); // "Assigned", "Submitted", "Marked as Done"

  const [classComment, setClassComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");
  const [classCommentsList, setClassCommentsList] = useState([]);
  const [privateCommentsList, setPrivateCommentsList] = useState([]);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitWork = () => {
    if (uploadedFiles.length > 0) {
      setStatus("Submitted");
    } else {
      alert("Please upload at least one file to submit.");
    }
  };

  const handleMarkAsDone = () => {
    if (status !== "Submitted") {
      setStatus("Marked as Done");
    }
  };

  const handlePostClassComment = () => {
    if (classComment.trim()) {
      setClassCommentsList([...classCommentsList, classComment]);
      setClassComment("");
    }
  };

  const handleSendPrivateComment = () => {
    if (privateComment.trim()) {
      setPrivateCommentsList([...privateCommentsList, privateComment]);
      setPrivateComment("");
    }
  };

  // Determine badge color
  const getBadge = () => {
    switch (status) {
      case "Submitted":
        return "bg-green-100 text-green-700";
      case "Marked as Done":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Assignment Header */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Assignment 1</h1>
              <p className="text-sm text-gray-600">gubsc datascience • Oct 11, 2021</p>
            </div>
            <span className={`${getBadge()} px-3 py-1 rounded-full text-sm font-semibold`}>
              {status}
            </span>
          </div>
          <p className="mt-4 text-gray-700">
            Please complete the questions related to <strong>MySQL Basics</strong>. Use the attached PPT as a guide.
          </p>

          {/* Attached by teacher */}
          <div className="mt-4 flex items-center border rounded-lg bg-gray-50 p-4 shadow-sm hover:shadow-md transition">
            <img
              src="https://img.icons8.com/color/48/000000/microsoft-powerpoint-2019--v1.png"
              alt="PowerPoint"
              className="w-10 h-10 mr-4"
            />
            <div>
              <p className="font-semibold text-gray-800">Assignment_MySQL_Guide.pptx</p>
              <p className="text-sm text-gray-500">Assigned by teacher</p>
            </div>
          </div>
        </div>

        {/* Student Upload Work Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Work</h2>

          {/* Upload input */}
          {status !== "Submitted" && (
            <>
              <label
                htmlFor="fileUpload"
                className="inline-block mb-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md cursor-pointer hover:bg-blue-50"
              >
                + Add File
              </label>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                multiple
                onChange={handleFileUpload}
              />
            </>
          )}

          {/* Uploaded file list */}
          {uploadedFiles.length > 0 && (
            <ul className="space-y-2 mb-4">
              {uploadedFiles.map((file, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md text-sm"
                >
                  <span>{file.name}</span>
                  {status !== "Submitted" && (
                    <button
                      onClick={() => handleRemoveFile(i)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSubmitWork}
              disabled={status === "Submitted"}
              className={`flex-1 py-2 font-medium rounded-md transition ${
                status === "Submitted"
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Submit Work
            </button>

            <button
              onClick={handleMarkAsDone}
              disabled={status === "Submitted" || status === "Marked as Done"}
              className={`flex-1 py-2 font-medium rounded-md transition ${
                status === "Submitted" || status === "Marked as Done"
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Mark as Done
            </button>
          </div>
        </div>

        {/* Class Comments */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Class Comments</h2>
          <textarea
            placeholder="Write a class comment..."
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring"
            rows={3}
            value={classComment}
            onChange={(e) => setClassComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={handlePostClassComment}
          >
            Post Comment
          </button>
          <ul className="mt-4 space-y-2">
            {classCommentsList.map((c, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded-md text-sm text-gray-700">
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Private Comments */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Private Comments</h2>
          <textarea
            placeholder="Write a private comment to instructor..."
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring"
            rows={3}
            value={privateComment}
            onChange={(e) => setPrivateComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
            onClick={handleSendPrivateComment}
          >
            Send Comment
          </button>
          <ul className="mt-4 space-y-2">
            {privateCommentsList.map((c, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded-md text-sm text-gray-700">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
