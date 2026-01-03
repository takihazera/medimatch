// import { useParams } from "react-router-dom";

// function EditHospital() {
//   const { id } = useParams();

//   return (
//     <div>
//       <h2>Edit Hospital</h2>
//       <p>Editing hospital ID: {id}</p>
//     </div>
//   );
// }

// export default EditHospital;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "600px",
    margin: "60px auto",
    padding: "32px",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    backgroundColor: "#f8fafc", // off-white outer container
    borderRadius: "14px",
  },
  card: {
    backgroundColor: "#ffffff", // white card
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },
  title: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: "24px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  testGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "background-color 0.2s ease, transform 0.1s ease",
  },
  submitButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    width: "100%",
    fontSize: "16px",
    marginTop: "12px",
  },
};

const EditHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    rating: "",
    tests: [],
  });

  // 🔐 Admin protection + fetch existing hospital
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/hospitals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHospital(res.data))
      .catch((err) => console.error(err));
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospital({
      ...hospital,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleTestChange = (index, e) => {
    const updatedTests = [...hospital.tests];
    updatedTests[index][e.target.name] = e.target.value;
    setHospital({ ...hospital, tests: updatedTests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("No admin token found. Please login again.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/hospitals/${id}`,
        hospital,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Hospital updated successfully!");
      navigate("/admin/hospitals");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Hospital</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={hospital.name}
            onChange={handleChange}
            placeholder="Hospital Name"
            required
            style={styles.input}
          />

          <input
            name="address"
            value={hospital.address}
            onChange={handleChange}
            placeholder="Address"
            required
            style={styles.input}
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            value={hospital.rating}
            onChange={handleChange}
            placeholder="Rating"
            required
            style={styles.input}
          />

          <h4>Tests</h4>
          {hospital.tests?.map((test, index) => (
            <div key={index} style={styles.testGroup}>
              <input
                name="testName"
                value={test.testName}
                onChange={(e) => handleTestChange(index, e)}
                placeholder="Test Name"
                required
                style={{ ...styles.input, flex: "2" }}
              />
              <input
                name="price"
                type="number"
                value={test.price}
                onChange={(e) => handleTestChange(index, e)}
                placeholder="Price"
                required
                style={{ ...styles.input, flex: "1" }}
              />
            </div>
          ))}

          <button
            type="submit"
            style={{ ...styles.button, ...styles.submitButton }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1d4ed8")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Update Hospital
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHospital;

