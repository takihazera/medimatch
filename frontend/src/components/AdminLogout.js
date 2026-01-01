import { useNavigate } from "react-router-dom";

function AdminLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
      Logout
    </button>
  );
}

export default AdminLogout;
