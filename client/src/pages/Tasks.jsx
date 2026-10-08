import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Tasks page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Tasks;
