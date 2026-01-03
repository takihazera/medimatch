import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import AdminLogout from "../components/AdminLogout";




const styles = {
  container: {
    maxWidth: "700px",
    margin: "100px auto",
    padding: "32px",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    backgroundColor: "#f8fafc",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  logoutButton: {
    padding: "10px 24px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    marginBottom: "20px",
  },
  addButton: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    marginBottom: "20px",
  },
  hospitalItem: {
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    textAlign: "left",
  },
};


function ViewHospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const token = localStorage.getItem("adminToken");


  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  navigate("/admin/login");
};

  // Fetch hospitals from backend
  useEffect(() => {
   if (!localStorage.getItem("adminToken")) {
  navigate("/admin/login");
}

    axios.get("http://localhost:5000/api/hospitals", {
    headers: { Authorization: `Bearer ${token}` }
  })
      .then(res => setHospitals(res.data))
      .catch(err => console.error(err));
  }, [token]);

  // delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hospital?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/hospitals/${id}`, {
  headers: { Authorization: `Bearer ${token}` }});

      setHospitals(hospitals.filter((h) => h._id !== id));
      alert("Hospital deleted");
    } catch (err) {
      // console.error(err);
      alert("Delete failed");
    }
  };

//////

return (
  <div style={styles.container}>
    <div style={styles.card}>


      <h2 style={styles.title}>Hospitals List</h2>

      <button
        style={styles.addButton}
        onClick={() => navigate("/admin/add-hospital")}
      >
        + Add Hospital
      </button>

      {hospitals.map((hospital) => (
        <div key={hospital._id} style={styles.hospitalItem}>
          <b>{hospital.name}</b>
          <div>{hospital.address}</div>
          <div>Rating: {hospital.rating}</div>

          <button
            onClick={() => navigate(`/admin/edit-hospital/${hospital._id}`)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(hospital._id)}
            style={{ color: "red" }}
          >
            Delete
          </button>


                {/* LOGOUT */}

        </div>
      ))}
      <button
        style={styles.logoutButton}
        onClick={handleLogout}
      >
        🚪 Logout
      </button>
    </div>
  </div>
);

}

export default ViewHospitals;
