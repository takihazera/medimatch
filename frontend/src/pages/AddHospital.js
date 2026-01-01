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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHospital = () => {
    const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // 🔐 Admin protection
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    rating: "",
    tests: [{ testName: "", price: "" }]
  });

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleTestChange = (index, e) => {
    const updatedTests = [...hospital.tests];
    updatedTests[index][e.target.name] = e.target.value;
    setHospital({ ...hospital, tests: updatedTests });
  };

  const addTestField = () => {
    setHospital({
      ...hospital,
      tests: [...hospital.tests, { testName: "", price: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("adminToken");
    try {
      await axios.post("http://localhost:5000/api/hospitals", hospital,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


      alert("Hospital added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding hospital");
    }
  };

  return (
    <div>
      <h2>Add Hospital</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Hospital Name"
          value={hospital.name}
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="address"
          placeholder="Address"
          value={hospital.address}
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          value={hospital.rating}
          onChange={handleChange}
          required
        />
        <br />

        <h4>Tests</h4>
        {hospital.tests.map((test, index) => (
          <div key={index}>
            <input
              name="testName"
              placeholder="Test Name"
              value={test.testName}
              onChange={(e) => handleTestChange(index, e)}
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={test.price}
              onChange={(e) => handleTestChange(index, e)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addTestField}>
          + Add Another Test
        </button>

        <br /><br />
        <button type="submit">Add Hospital</button>
      </form>
    </div>
  );
};

export default AddHospital;
