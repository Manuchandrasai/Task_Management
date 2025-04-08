import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskFilter = ({ filter, setFilter }) => {
  const { tasks } = useContext(TaskContext);

  const allCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = allCount - completedCount;

  const filters = [
    { key: "all", label: "All", count: allCount, color: "#0d6efd" },     
    { key: "pending", label: "Pending", count: pendingCount, color: "#ffc107" }, 
    { key: "completed", label: "Completed", count: completedCount, color: "#198754" },
  ];

  return (
    <div className="d-flex justify-content-center mb-4">
      <ul className="nav nav-pills gap-3">
        {filters.map((f) => (
          <li key={f.key} className="nav-item">
            <button
              className={`nav-link ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "20px",
                fontWeight: 500,
                backgroundColor: filter === f.key ? f.color : "#f0f0f0",
                color: filter === f.key ? "#fff" : "#333",
                border: "none",
              }}
            >
              <span>{f.label}</span>
              <span
                style={{
                  backgroundColor: f.color,
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  color: "#fff",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {f.count}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskFilter;
