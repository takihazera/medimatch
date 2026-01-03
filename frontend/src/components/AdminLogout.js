// import { useNavigate } from "react-router-dom";

// function AdminLogout() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   return (
//     <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
//       Logout
//     </button>
//   );
// }

// export default AdminLogout;


import { useNavigate } from "react-router-dom";

function AdminLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={{ textAlign: "right", marginBottom: "20px" }}>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#dc2626",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "500",
          fontFamily: "Segoe UI, system-ui, sans-serif",
          boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default AdminLogout;
