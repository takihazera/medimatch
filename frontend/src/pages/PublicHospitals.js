import { useEffect, useState } from "react";
import axios from "axios";

function PublicHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [recommended, setRecommended] = useState(null);
  // const [reviewText, setReviewText] = useState("");
  const [reviewText, setReviewText] = useState({});



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





const submitReview = async (hospitalId) => {
  const comment = reviewText[hospitalId];

  if (!comment) {
    alert("Write a review first");
    return;
  }

    try {
      await axios.post(
        `http://localhost:5000/api/hospitals/${hospitalId}/review`,
        { comment }
      );

      alert("Review submitted");
      setReviewText({
      ...reviewText,
      [hospitalId]: ""
    });

      // refresh hospitals to show new review
      const res = await axios.get("http://localhost:5000/api/hospitals");
      setHospitals(res.data);
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", fontFamily: "Arial" }}>

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



{/* Review input */}
<input
  type="text"
  placeholder="Write a review"
  value={reviewText[hospital._id] || ""}
  onChange={(e) =>
    setReviewText({
      ...reviewText,
      [hospital._id]: e.target.value
    })
  }
/>


<button onClick={() => submitReview(hospital._id)}>
  Submit Review
</button>

{/* Show reviews */}
{hospital.reviews && hospital.reviews.length > 0 && (
  <>
    <h4>Reviews:</h4>
    <ul>
      {hospital.reviews.map((r, i) => (
        <li key={i}>{r.comment}</li>
      ))}
    </ul>
  </>
)}

        </div>
      ))}
    </div>
  );
}

export default PublicHospitals;