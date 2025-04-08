import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { FaArrowLeft } from "react-icons/fa";

const EditTask = () => {
  const { tasks, updateTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const taskToEdit = tasks.find((task) => task.id.toString() === taskId);

  const today = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [fromDate, setFromDate] = useState(taskToEdit?.fromDate || "");
  const [toDate, setToDate] = useState(taskToEdit?.toDate || "");
  const [error, setError] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (!taskToEdit) {
      navigate("/");
    }
  }, [taskToEdit, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(fromDate) > new Date(toDate)) {
      setError("From Date cannot be later than To Date.");
      return;
    }

    if (!title.trim() || !description.trim() || !toDate.trim()) {
      setError("All fields are required!");
      return;
    }

    updateTask(taskId, { title, description, fromDate, toDate });
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
          <h4 className="text-center text-white mb-4">Edit Task</h4>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsModified(true);
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Task Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsModified(true);
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                min={today}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setIsModified(true);
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                min={fromDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setIsModified(true);
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={!isModified}
            >
              Update Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
