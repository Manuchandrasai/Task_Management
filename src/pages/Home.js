import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskBarChart from "../components/TaskBarChart";
import TaskPieChart from "../components/TaskPieChart";
import { TaskContext } from "../context/TaskContext";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const { tasks, toggleComplete, deleteTask, filter, setFilter } = useContext(TaskContext);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container-fluid p-4 text-black">
      <div class="flex-container">
      <h1 className="app-title text-center mb-4 ">Task Manager</h1>
      </div>

      <div className="row">
        {/* 🟦 Task Section - 70% on md+, 100% on mobile */}
        <div className="col-12 col-md-8 mb-4">
          <div className="glass-card">
            {/* Header Row */}
            <div className="d-flex flex-wrap justify-content-end align-items-center gap-2 mb-3">
              {searchVisible && (
                <input
                  type="text"
                  className="form-control"
                  style={{ maxWidth: "200px" }}
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              )}
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearchVisible(!searchVisible)}
              >
                <FaSearch />
              </button>
              <button className="btn btn-primary" onClick={() => navigate("/add-task")}>
                Add Task
              </button>
            </div>

            <TaskFilter filter={filter} setFilter={setFilter} />
            <TaskList
              tasks={filteredTasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              filter={filter}
            />
          </div>
        </div>

        {/* 🟨 Chart Section - 30% on md+, 100% on mobile */}
        <div className="col-12 col-md-4">
          <div className="mb-4">
            <TaskBarChart />
          </div>
          <div>
            <TaskPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
