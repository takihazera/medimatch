import { useEffect, useState } from "react";
import axios from "axios";

function PublicHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [recommended, setRecommended] = useState(null);

  // fetch hospitals
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hospitals")
      .then((res) => setHospitals(res.data))
      .catch((err) => console.error(err));
  }, []);

  // AI recommendation (logic-based)
  const findBestOption = () => {
    if (hospitals.length === 0) return;

    const best = [...hospitals].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return a.tests[0]?.price - b.tests[0]?.price;
    })[0];

    setRecommended(best);
  };

  return (
    <div>
      <h2>Diagnostic Cost Comparison</h2>

      {/* Search */}
      <input
        placeholder="Search test name (e.g. CBC)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={findBestOption}>Best Option</button>

      {/* AI Result */}
      {recommended && (
        <p>
          ✅ Recommended: <b>{recommended.name}</b> (Rating: {recommended.rating})
        </p>
      )}

      <hr />

      {/* Hospital List */}
      {hospitals.map((hospital) => (
        <div key={hospital._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{hospital.name}</h3>
          <p>Rating: {hospital.rating}</p>
          <p>Address: {hospital.address}</p>

          <b>Tests:</b>
          <ul>
            {hospital.tests
              .filter((t) =>
                t.testName.toLowerCase().includes(search.toLowerCase())
              )
              .map((test, i) => (
                <li key={i}>
                  {test.testName} — ৳{test.price}
                </li>
              ))}
          </ul>

          {/* Fake Review */}
          <button
            onClick={() => alert("Thank you for your feedback!")}
          >
            Leave Review
          </button>
        </div>
      ))}
    </div>
  );
}

export default PublicHospitals;