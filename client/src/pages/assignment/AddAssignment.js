import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAssignment = () => {
  const { id: courseId } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    marks: ""
  });
  const [questionFile, setQuestionFile] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setQuestionFile(file);
  };

  const handleSubmit = async () => {
    const { title, description, dueDate, marks } = form;

    if (!title || !description || !dueDate || !marks || !questionFile) {
      toast.error("All fields and a question file are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("marks", marks);
    formData.append("courseId", courseId);
    formData.append("questionFile", questionFile);

    try {
      const res = await fetch("http://localhost:7777/api/assignments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Assignment created!");
        navigate(`/courses/${courseId}`);
      } else {
        toast.error(data.message || "Failed to create assignment");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-xl bg-white p-6 rounded-lg shadow mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Assignment</h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          name="marks"
          type="number"
          placeholder="Marks"
          value={form.marks}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="file"
          accept=".pdf,.ppt,.pptx,.docx"
          onChange={handleFileChange}
          className="w-full mb-4 px-3 py-2 border rounded bg-white"
        />

        {questionFile && (
          <p className="text-sm text-gray-500 mb-4">
            Selected File: <strong>{questionFile.name}</strong>
          </p>
        )}

        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAssignment;
