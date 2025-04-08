import React, { useContext, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { TaskContext } from "../context/TaskContext";

const COLORS = ["#0d6efd", "#ffc107", "#198754"];

const TaskPieChart = () => {
  const { tasks } = useContext(TaskContext);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    return [
      { name: "All", value: total },
      { name: "Pending", value: pending },
      { name: "Completed", value: completed },
    ];
  }, [tasks]);

  return (
    <div className="glass-card">
    <h6 className="text-center mb-3">Task Status (Pie)</h6>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={stats}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          fill="#8884d8"
        >
          {stats.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
</div>

  );
};

export default TaskPieChart;
