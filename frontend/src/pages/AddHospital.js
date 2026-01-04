// function AddHospital() {
//   return (
//     <div>
//       <h2>Add Hospital</h2>
//       <p>Hospital form will go here</p>
//     </div>
//   );
// }

// export default AddHospital;


// import React, { useState } from "react";
//=================================================


import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

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
  boxSizing: "border-box", 
},

  testGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "background-color 0.2s ease, transform 0.1s ease",
  },
  addTestButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    marginBottom: "16px",
  },
  submitButton: {
    backgroundColor: "#16a34a",
    color: "#fff",
    width: "100%",
    fontSize: "16px",
  },
};




const AddHospital = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
console.log("ADMIN TOKEN:", token);
  // Admin protection
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    rating: "",
    tests: [{ testName: "", price: "" }],
  });

  // const handleChange = (e) => {
  //   setHospital({ ...hospital, [e.target.name]: e.target.value });
  // };
const handleChange = (e) => {
  const { name, value } = e.target;
  setHospital({
    ...hospital,
    [name]: name === "rating" ? Number(value) : value,
  });
};

  // const handleTestChange = (index, e) => {
  //   const updatedTests = [...hospital.tests];
  //   updatedTests[index][e.target.name] = e.target.value;
  //   setHospital({ ...hospital, tests: updatedTests });
  // };
const handleTestChange = (index, e) => {
  const updatedTests = [...hospital.tests];
  updatedTests[index][e.target.name] =
    e.target.name === "price" ? Number(e.target.value) : e.target.value;

  setHospital({ ...hospital, tests: updatedTests });
};

  const addTestField = () => {
    setHospital({
      ...hospital,
      tests: [...hospital.tests, { testName: "", price: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await axios.post("http://localhost:5000/api/hospitals", hospital, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
////new
  const token = localStorage.getItem("adminToken");
  if (!token) {
    alert("You are not logged in as admin!");
    navigate("/admin/login");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/hospitals",
      hospital, // send hospital state
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );



      alert("Hospital added successfully!");
      // Reset form
      setHospital({
        name: "",
        address: "",
        rating: "",
        tests: [{ testName: "", price: "" }],
      });
    } catch (err) {
      console.error(err);
      alert("Error adding hospital: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Hospital</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Hospital Name"
            value={hospital.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="address"
            placeholder="Address"
            value={hospital.address}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            value={hospital.rating}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <h4>Tests</h4>
          {hospital.tests.map((test, index) => (
            <div key={index} style={styles.testGroup}>
              <input
                name="testName"
                placeholder="Test Name"
                value={test.testName}
                onChange={(e) => handleTestChange(index, e)}
                required
                style={{ ...styles.input, flex: "2" }}
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={test.price}
                onChange={(e) => handleTestChange(index, e)}
                required
                style={{ ...styles.input, flex: "1" }}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTestField}
            style={{ ...styles.button, ...styles.addTestButton }}
          >
            + Add Another Test
          </button>

          <button
            type="submit"
            style={{ ...styles.button, ...styles.submitButton }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#15803d")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#16a34a")
            }
          >
            Add Hospital
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;

