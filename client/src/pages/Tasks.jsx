import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TaskItem from "../components/TaskItem";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleApiError = (err) => {
    if (err.response?.status === 401) {
      handleLogout(); // token missing or expired
      return;
    }
    setError(err.response?.data?.message || "Something went wrong");
  };

  // Load tasks once, when the page first appears
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) return;

    try {
      const res = await api.post("/tasks", { title, description });
      setTasks([res.data, ...tasks]); // new task goes to the top
      setTitle("");
      setDescription("");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleToggle = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleSave = async (id, updates) => {
    try {
      const res = await api.put(`/tasks/${id}`, updates);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2>My Tasks</h2>
        <button className="btn btn-gray" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form className="task-form" onSubmit={handleAdd}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn" type="submit">
          Add task
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {loading && <p>Loading...</p>}
      {!loading && tasks.length === 0 && (
        <p>No tasks yet. Add your first one above.</p>
      )}

      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={handleToggle}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Tasks;
