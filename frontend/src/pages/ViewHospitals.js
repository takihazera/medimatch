import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminLogout from "../components/AdminLogout";


function ViewHospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const token = localStorage.getItem("adminToken");

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
    <div>
      <AdminLogout />
      <h2>Hospitals List</h2>

      <button onClick={() => navigate("/admin/add-hospital")}>
        + Add Hospital
      </button>
      <ul>
        {hospitals.map(hospital => (
          <li key={hospital._id}>
            {hospital.name} - {hospital.address} - {hospital.rating}

            <button onClick={() => navigate(`/admin/edit-hospital/${hospital._id}`)}>
              Edit
            </button>

            <button
              onClick={() => handleDelete(hospital._id)}
              style={{ color: "red", marginLeft: "10px" }}>
              Delete
            </button>
          
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewHospitals;
