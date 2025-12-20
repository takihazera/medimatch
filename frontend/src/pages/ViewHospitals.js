import { useNavigate } from "react-router-dom";

function ViewHospitals() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Hospitals List</h2>

      <button onClick={() => navigate("/admin/add-hospital")}>
        + Add Hospital
      </button>

      <ul>
        <li>
          City Hospital
          <button onClick={() => navigate("/admin/edit-hospital/1")}>
            Edit
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ViewHospitals;
