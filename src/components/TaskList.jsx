import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import ReactPaginate from "react-paginate";
import "../styles/TaskList.css";

const statuses = ["All", "Not Started", "In Progress", "Finished"];
const LOCAL_STORAGE_KEY = "tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [sortColumn, setSortColumn] = useState("description");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 5;

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredTasks =
    filterStatus === "All"
      ? sortedTasks
      : sortedTasks.filter((task) => task.status === filterStatus);

  const indexOfLastTask = (currentPage + 1) * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="task-list">
      <TaskForm
        onAddTask={addTask}
        onEditTask={editTask}
        editingTask={editingTask}
      />
      <div className="filters">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleSort("description")}
          className={sortColumn === "description" ? "active" : ""}
        >
          Sort by Description{" "}
          {sortColumn === "description" &&
            (sortDirection === "asc" ? "▲" : "▼")}
        </button>
        <button
          onClick={() => handleSort("status")}
          className={sortColumn === "status" ? "active" : ""}
        >
          Sort by Status{" "}
          {sortColumn === "status" && (sortDirection === "asc" ? "▲" : "▼")}
        </button>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => setEditingTask(task)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </tbody>
      </table>
      <ReactPaginate
        className="pagination"
        pageCount={Math.ceil(filteredTasks.length / tasksPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        disabledClassName="disabled"
      />
    </div>
  );
};

export default TaskList;
