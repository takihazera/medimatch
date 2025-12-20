import { useParams } from "react-router-dom";

function EditHospital() {
  const { id } = useParams();

  return (
    <div>
      <h2>Edit Hospital</h2>
      <p>Editing hospital ID: {id}</p>
    </div>
  );
}

export default EditHospital;
