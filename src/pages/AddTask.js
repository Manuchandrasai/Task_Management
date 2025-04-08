import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { FaArrowLeft } from "react-icons/fa";

const AddTask = () => {
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !toDate.trim()) {
      setError("All fields are required!");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      setError("From Date cannot be later than To Date.");
      return;
    }

    addTask({ title, description, fromDate, toDate, completed: false });
    navigate("/");
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-start mt-4">
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Go Back
        </button>

        <div className="glass-card">
          <h4 className="text-center text-white mb-4">Create Task</h4>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Task Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                min={today}  // From date can't be before today
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                min={fromDate}  // To date can't be before from date
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
