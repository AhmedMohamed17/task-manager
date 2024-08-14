import React, { useState, useEffect } from "react";
import "../styles/TaskForm.css";

const statuses = ["Not Started", "In Progress", "Finished"];

const TaskForm = ({ onAddTask, onEditTask, editingTask }) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(statuses[0]);

  useEffect(() => {
    if (editingTask) {
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      description,
      status,
    };
    if (editingTask) {
      onEditTask(newTask);
    } else {
      onAddTask(newTask);
    }
    setDescription("");
    setStatus(statuses[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
