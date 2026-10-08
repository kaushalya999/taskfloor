import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onSave(task._id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <div className="task-edit">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <div className="task-actions">
            <button className="btn" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-gray" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
      <div className={task.completed ? "task-body done" : "task-body"}>
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className="task-actions">
        <button className="btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-red" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
