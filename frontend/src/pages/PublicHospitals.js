import { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  searchBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  muted: {
    color: "#555",
    fontSize: "14px",
  },
  reviewBox: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
};





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

    <div style={styles.container}>

      <h2 style={styles.title}>🏥 Diagnostic Cost Comparison</h2>



      <div style={styles.searchBar}>
        <input
          style={styles.input}
          placeholder="Search test name (e.g. CBC)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={styles.button} onClick={findBestOption}>
          Best Option
        </button>
      </div>


      {recommended && (
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          ✅ Recommended: <b>{recommended.name}</b> (Rating: {recommended.rating})
        </p>
      )}



      {hospitals.map((hospital) => (
        <div key={hospital._id} style={styles.card}>
          <h3>{hospital.name}</h3>
          <p style={styles.muted}>Rating: {hospital.rating}</p>
          <p style={styles.muted}>Address: {hospital.address}</p>

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



<div style={styles.reviewBox}>
            <input
              style={styles.input}
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


            <button style={{ ...styles.button, backgroundColor: "#16a34a" }} onClick={() => submitReview(hospital._id)}>
              Submit
            </button>
          </div>


          
          {hospital.reviews?.length > 0 && (
            <>
              <h4 style={{ marginTop: "12px" }}>Reviews</h4>
              <ul>       {hospital.reviews.map((r, i) => (
                <li key={i} style={styles.muted}>{r.comment}</li>
              ))}    </ul>
            </>
          )}

        </div>
      ))}
    </div>
  );
}

  export default PublicHospitals;