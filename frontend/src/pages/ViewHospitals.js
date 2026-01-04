import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "80px auto",
    padding: "32px",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#0f172a",
  },
  addButton: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
  },
  hospitalGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
  },
  hospitalCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  },
  hospitalName: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  hospitalInfo: {
    fontSize: "14px",
    color: "#475569",
    marginBottom: "12px",
  },
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
  },
  editBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#e0e7ff",
    color: "#1d4ed8",
    cursor: "pointer",
  },
  deleteBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    cursor: "pointer",
  },
  logoutWrapper: {
    textAlign: "center",
    marginTop: "40px",
  },
  logoutButton: {
    padding: "12px 26px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};

function ViewHospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const token = localStorage.getItem("adminToken");

  // 🔐 Admin protection + fetch
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/hospitals", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHospitals(res.data))
      .catch((err) => console.error(err));
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hospital?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/hospitals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHospitals(hospitals.filter((h) => h._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Hospitals</h2>
        <button
          style={styles.addButton}
          onClick={() => navigate("/admin/add-hospital")}
        >
          + Add Hospital
        </button>
      </div>

      <div style={styles.hospitalGrid}>
        {hospitals.map((hospital) => (
          <div key={hospital._id} style={styles.hospitalCard}>
            <div style={styles.hospitalName}>{hospital.name}</div>
            <div style={styles.hospitalInfo}>{hospital.address}</div>
            <div style={styles.hospitalInfo}>
              Rating: {hospital.rating}
            </div>

            <div style={styles.actionRow}>
              <button
                style={styles.editBtn}
                onClick={() =>
                  navigate(`/admin/edit-hospital/${hospital._id}`)
                }
              >
                Edit
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(hospital._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.logoutWrapper}>
        <button style={styles.logoutButton} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default ViewHospitals;
