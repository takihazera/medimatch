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


const EditHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    rating: "",
    tests: []
  });
  // const token = localStorage.getItem("adminToken");
  // 1️⃣ Fetch existing hospital
  useEffect(() => {
    // if (!token) return;

    if (!token) {
      navigate("/admin/login");
      return;
    }

  axios
    .get(`http://localhost:5000/api/hospitals/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setHospital(res.data))
    .catch((err) => console.error(err));
}, [id, token, navigate]);

// 2️⃣ Handle input change
const handleChange = (e) => {
  const { name, value } = e.target;
  setHospital({
    ...hospital,
    [name]: name === "rating" ? Number(value) : value
  });
};




//   setHospital({ ...hospital, [e.target.name]: e.target.value });
// };

// 3️⃣ Handle test change
const handleTestChange = (index, e) => {
  const updatedTests = [...hospital.tests];
  updatedTests[index][e.target.name] = e.target.value;
  setHospital({ ...hospital, tests: updatedTests });
};

// 4️⃣ Submit update
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!token) {
    alert("No admin token found. Please login again.");
    return;
  }
  try {
    await axios.put(
      `http://localhost:5000/api/hospitals/${id}`,
      hospital, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Hospital updated successfully!");
    navigate("/admin/hospitals");
  } catch (err) {
    console.error(err);
    alert("Update failed");
  }
};

return (
  <div>
    <h2>Edit Hospital</h2>

    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={hospital.name}
        onChange={handleChange}
        placeholder="Hospital Name"
        required
      />
      <br />

      <input
        name="address"
        value={hospital.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <br />

      <input
        name="rating"
        type="number"
        step="0.1"
        value={hospital.rating}
        onChange={handleChange}
        placeholder="Rating"
        required
      />
      <br />

      <h4>Tests</h4>
      {hospital.tests?.map((test, index) => (
        <div key={index}>
          <input
            name="testName"
            value={test.testName}
            onChange={(e) => handleTestChange(index, e)}
            placeholder="Test Name"
            required
          />
          <input
            name="price"
            type="number"
            value={test.price}
            onChange={(e) => handleTestChange(index, e)}
            placeholder="Price"
            required
          />
        </div>
      ))}

      <br />
      <button type="submit">Update Hospital</button>
    </form>
  </div>
);
};

export default EditHospital;

