import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );
      // console.log(res.data); // 🔍 check what comes from backend
      // localStorage.setItem("adminToken", res.data.token);
      // console.log(localStorage.getItem("adminToken")); // 🔍 check if saved
      // store token
      //   localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminToken", res.data.token);


      navigate("/admin/hospitals");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        flexDirection: "column",
      }}
    >

      <h2>Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br></br>
        <button
          type="submit"
          style={{
            display: "block",
            margin: "0 auto",
          }}
        >Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;