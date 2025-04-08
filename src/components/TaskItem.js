import React from "react";
import { FaCheckCircle, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: task.completed ? "#d4edda" : "#fff3cd",
    border: "1px solid #ced4da",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  };
  const titleStyle = {
    fontFamily: "'Noteworthy', 'Apple Chancery', cursive",
    color: "#000",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textDecoration: task.completed ? "line-through" : "none",
    opacity: task.completed ? 0.6 : 1,
    marginBottom: "8px",
  };
  const descriptionStyle = {
    fontFamily: "'Times New Roman', Times, serif",
    color: "#000",
    fontSize: "1rem",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    marginBottom: "8px",
  };
  const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  };
  const dateStyle = {
    fontStyle: "italic",
    fontWeight: "500",
    fontSize: "0.9rem",
    color: "#343a40",
  };
  return (
    <div style={cardStyle}>
      <div className="card-body p-0">
        <h6 style={titleStyle}>{task.title}</h6>
        <p style={descriptionStyle}>{task.description}</p>
        <hr className="my-2" />
        <div style={footerStyle}>
          <p style={dateStyle}>
          <strong>
            From: {task.fromDate} | To: {task.toDate}
            </strong>
          </p>
          <div className="d-flex gap-2">
            {!task.completed && (
              <button
                className="btn btn-sm btn-warning"
                onClick={() => navigate(`/edit-task/${task.id}`)}
              >
                <FaEdit />
              </button>
            )}
            <button className="btn btn-sm btn-success" onClick={() => toggleComplete(task.id)}>
              <FaCheckCircle />
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
