import { useEffect, useState } from "react";

import axios from "axios";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "24px",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
  },

  title: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#0f172a",
    fontWeight: "600",
  },

  searchBar: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  },

  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
  },

  card: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "18px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },

  muted: {
    color: "#475569",
    fontSize: "14px",
    marginBottom: "4px",
  },

  reviewBox: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },

  testItem: {
    padding: "6px 0",
    borderBottom: "1px dashed #e5e7eb",
    fontSize: "14px",
  },

  reviewItem: {
    backgroundColor: "#f1f5f9",
    padding: "8px 10px",
    borderRadius: "6px",
    marginBottom: "6px",
    fontSize: "13px",
    color: "#334155",
  },
};

function PublicHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [recommended, setRecommended] = useState(null);
  const [reviewText, setReviewText] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hospitals")
      .then((res) => setHospitals(res.data))
      .catch((err) => console.error(err));
  }, []);

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
        [hospitalId]: "",
      });

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
        <div
          style={{
            backgroundColor: "#dcfce7",
            color: "#166534",
            padding: "12px",
            borderRadius: "10px",
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: "500",
          }}
        >
          ✅ Recommended: <b>{recommended.name}</b> (⭐ {recommended.rating})
        </div>
      )}

      {hospitals.map((hospital) => (
        <div key={hospital._id} style={styles.card}>
          <h3 style={{ marginBottom: "6px", color: "#020617" }}>
            {hospital.name}
          </h3>
          <p style={styles.muted}>⭐ Rating: {hospital.rating}</p>
          <p style={styles.muted}>📍 Address: {hospital.address}</p>

          <b>Tests:</b>
          <ul style={{ paddingLeft: "18px", marginTop: "6px" }}>
            {hospital.tests
              .filter((t) =>
                t.testName.toLowerCase().includes(search.toLowerCase())
              )
              .map((test, i) => (
                <li key={i} style={styles.testItem}>
                  {test.testName} — <b>৳{test.price}</b>
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
                  [hospital._id]: e.target.value,
                })
              }
            />

            <button
              style={{ ...styles.button, backgroundColor: "#16a34a" }}
              onClick={() => submitReview(hospital._id)}
            >
              Submit
            </button>
          </div>

          {hospital.reviews?.length > 0 && (
            <>
              <h4 style={{ marginTop: "12px" }}>Reviews</h4>
              <ul style={{ paddingLeft: "0", listStyle: "none" }}>
                {hospital.reviews.map((r, i) => (
                  <li key={i} style={styles.reviewItem}>
                    {r.comment}
                  </li>
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
