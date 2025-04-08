import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");

  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id.toString() === taskId.toString() ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id.toString() !== taskId.toString()));
  };

  // ✅ Fix: Define `updateTask`
  const updateTask = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id.toString() === taskId.toString() ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleComplete, deleteTask, updateTask, filter, setFilter }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
