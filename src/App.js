import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskProvider from "./context/TaskContext";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task/:taskId" element={<EditTask />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
