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

//........................
// import { useNavigate } from "react-router-dom";

// function AdminLogout() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   return (
//     <div style={{ textAlign: "right", marginBottom: "20px" }}>
//       <button
//         onClick={handleLogout}
//         style={{
//           padding: "10px 18px",
//           borderRadius: "8px",
//           border: "none",
//           backgroundColor: "#dc2626",
//           color: "#fff",
//           cursor: "pointer",
//           fontWeight: "500",
//           fontFamily: "Segoe UI, system-ui, sans-serif",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
//         }}
//       >
//         🚪 Logout
//       </button>
//     </div>
//   );
// }

// export default AdminLogout;
//..............

import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "500px",
    margin: "100px auto", // vertically centered
    padding: "32px",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    backgroundColor: "#f8fafc", // soft off-white background like hospital container
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff", // white card inside container
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },
  title: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: "16px",
  },
  description: {
    fontSize: "14px",
    color: "#475569",
    marginBottom: "24px",
  },
  button: {
    padding: "12px 28px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#dc2626", // red logout
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    transition: "background-color 0.2s ease, transform 0.1s ease",
  },
};

function AdminLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Panel</h2>
        <p style={styles.description}>
          You are logged in as admin. Click the button below to logout.
        </p>
        <button
          style={styles.button}
          onClick={handleLogout}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default AdminLogout;
