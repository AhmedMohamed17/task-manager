import React from "react";
import "../styles/TaskItem.css";

const statusColors = {
  "Not Started": "grey",
  "In Progress": "blue",
  Finished: "green",
};

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <tr className="task-item">
      <td className="task-description">{task.description}</td>
      <td>
        <span
          className="task-status"
          style={{ backgroundColor: statusColors[task.status] }}
        >
          {task.status}
        </span>
      </td>
      <td className="task-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default TaskItem;
