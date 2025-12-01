import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_API_URL;

const AssignmentPage = () => {
  const { id: assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("Assigned");
  const [classComment, setClassComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");
  const [classCommentsList, setClassCommentsList] = useState([]);
  const [privateCommentsList, setPrivateCommentsList] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isOwner = assignment && user?._id === assignment.teacherId;

  const fetchAssignment = async () => {
    try {
      const res = await fetch(`${API}/api/assignments/${assignmentId}`, {
        headers: { "x-user-id": user._id }
      });

      const data = await res.json();
      if (res.ok) {
        setAssignment(data);
        setStatus(data.status);
        setClassCommentsList(data.classComments || []);
        setPrivateCommentsList(data.privateComments || []);
      }
    } catch {
      toast.error("Failed to load assignment");
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitWork = async () => {
    if (!selectedFile) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(`${API}/api/assignments/${assignmentId}/submit`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Submitted successfully");
        setSelectedFile(null);
        fetchAssignment();
      } else {
        toast.error(data.message || "Submit failed");
      }
    } catch {
      toast.error("Submit error");
    }
  };

  const handleUnsubmit = async () => {
    try {
      const res = await fetch(`${API}/api/assignments/${assignmentId}/unsubmit`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        toast.success("Unsubmitted successfully");
        fetchAssignment();
      } else {
        toast.error("Unsubmit failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handlePostClassComment = async () => {
    if (!classComment.trim()) return;

    try {
      const res = await fetch(`${API}/api/assignments/${assignmentId}/class-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: classComment,
          userId: user._id,
          name: user.name || "Anonymous"
        })
      });

      const data = await res.json();
      if (res.ok) {
        setClassCommentsList(data.assignment.classComments);
        setClassComment("");
      } else {
        toast.error(data.message || "Failed to post class comment");
      }
    } catch {
      toast.error("Failed to post class comment");
    }
  };

  const handleSendPrivateComment = async () => {
    if (!privateComment.trim()) return;

    try {
      const res = await fetch(`${API}/api/assignments/${assignmentId}/private-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: privateComment,
          userId: user._id,
          name: user.name || "Anonymous"
        })
      });

      const data = await res.json();
      if (res.ok) {
        setPrivateCommentsList(data.assignment.privateComments);
        setPrivateComment("");
      } else {
        toast.error(data.message || "Failed to send private comment");
      }
    } catch {
      toast.error("Failed to send private comment");
    }
  };

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

  if (!assignment) return <div className="p-6">Loading assignment...</div>;

  const currentSubmission = assignment?.submissions?.find(
    (s) => s.userId?.toString() === user._id
  );

  const isSubmitted = currentSubmission && currentSubmission.file?.path;

  const submittedFileURL = currentSubmission?.file?.path?.startsWith("http")
    ? currentSubmission.file.path
    : `${API}/uploads/${currentSubmission?.file?.path}`;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{assignment.title}</h1>
              <p className="text-sm text-gray-600">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>
            <span className={`${getBadge()} px-3 py-1 rounded-full text-sm font-semibold`}>
              {status}
            </span>
          </div>
          <p className="mt-4 text-gray-700">{assignment.description}</p>

          {assignment.questionFile && (
            <div className="mt-4 flex items-center border rounded-lg bg-gray-50 p-4 shadow-sm">
              <img
                src="https://img.icons8.com/color/48/000000/file.png"
                alt="File"
                className="w-10 h-10 mr-4"
              />
              <div>
                <a
                  href={`${API}/uploads/${assignment.questionFile}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {assignment.questionFile}
                </a>
                <p className="text-sm text-gray-500">Assigned by teacher</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Work</h2>

          {isOwner ? (
            <p className="text-sm text-gray-500">Only students can submit work.</p>
          ) : isSubmitted ? (
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md text-sm mb-4">
              <a
                href={submittedFileURL}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {currentSubmission.file.name || "Submitted File"}
              </a>
              <button onClick={handleUnsubmit} className="text-red-600 hover:underline">
                Unsubmit
              </button>
            </div>
          ) : (
            <>
              <input type="file" onChange={handleFileUpload} className="mb-4" />
              {selectedFile && (
                <p className="text-sm mb-2 text-gray-600">Selected: {selectedFile.name}</p>
              )}
              <button
                onClick={handleSubmitWork}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit Work
              </button>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Class Comments</h2>
          <textarea
            className="w-full border rounded-md p-3 text-sm"
            rows={3}
            placeholder="Write a class comment..."
            value={classComment}
            onChange={(e) => setClassComment(e.target.value)}
          />
          <button
            onClick={handlePostClassComment}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Post Comment
          </button>
          <ul className="mt-4 space-y-2">
            {classCommentsList.map((c, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded-md text-sm text-gray-700">
                <strong>{c.name}:</strong> {c.comment}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Private Comments</h2>

          {!isOwner && (
            <>
              <textarea
                className="w-full border rounded-md p-3 text-sm mb-3"
                rows={3}
                placeholder="Write a private comment..."
                value={privateComment}
                onChange={(e) => setPrivateComment(e.target.value)}
              />
              <button
                onClick={handleSendPrivateComment}
                className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
              >
                Send Comment
              </button>
            </>
          )}

          {privateCommentsList.length === 0 ? (
            <p className="text-sm text-gray-500">
              {isOwner ? "No private comments yet." : "You haven’t posted any private comments yet."}
            </p>
          ) : (
            <ul className="space-y-2">
              {privateCommentsList.map((c, i) => (
                <li key={i} className="bg-gray-100 p-2 rounded-md text-sm text-gray-700">
                  <strong>{c.name}:</strong> {c.comment}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default AssignmentPage;
