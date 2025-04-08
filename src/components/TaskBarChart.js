import React, { useContext, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { TaskContext } from "../context/TaskContext";

const TaskBarChart = () => {
  const { tasks } = useContext(TaskContext);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  const data = [
    { name: "All", value: stats.total, fill: "#0d6efd" },
    { name: "Completed", value: stats.completed, fill: "#198754" },
    { name: "Pending", value: stats.pending, fill: "#ffc107" },
  ];

  return (
    <div className="glass-card">
      <h6 className="text-center mb-3">Task Status (Bar)</h6>
      <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
};

export default TaskBarChart;
