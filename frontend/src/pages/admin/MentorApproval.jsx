import React, { useEffect, useState } from "react";
import api from "../../services/axios";

function MentorApproval() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPendingMentors();
  }, []);

  const fetchPendingMentors = async () => {
    try {
      const res = await api.get("mentors/pending-mentors/");
      setMentors(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load mentor applications");
    } finally {
      setLoading(false);
    }
  };

 const handleApprove = async (id) => {
  try {
    await api.patch(`mentors/approve-mentor/${id}/`);

    setMentors((prev) =>
      prev.map((mentor) =>
        mentor.id === id
          ? { ...mentor, status: "approved" }
          : mentor
      )
    );

  } catch (err) {
    console.error("Approve error:", err);
  }
};

 const handleReject = async (id) => {
  try {
    await api.patch(`mentors/reject-mentor/${id}/`);

    setMentors((prev) =>
      prev.map((mentor) =>
        mentor.id === id
          ? { ...mentor, status: "rejected" }
          : mentor
      )
    );
  } catch (err) {
    console.error("Reject error:", err);
  }
};

  return (
    <div style={styles.container}>
      <h2>Mentor Approval</h2>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>App ID</th>
              <th>Mentor Name</th>
              <th>Expertise</th>
              <th>Experience</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={styles.centerText}>
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" style={styles.centerText}>
                  {error}
                </td>
              </tr>
            ) : mentors.length === 0 ? (
              <tr>
                <td colSpan="7" style={styles.centerText}>
                  No pending mentor applications
                </td>
              </tr>
            ) : (
              mentors.map((mentor) => (
                <tr key={mentor.id} style={styles.row}>
                  <td>{mentor.id}</td>

                  <td>
                    <div>
                      <strong>{mentor.name}</strong>
                      <div style={styles.email}>
                        {mentor.email}
                      </div>
                    </div>
                  </td>

                  <td>{mentor.primary_expertise}</td>
                  <td>{mentor.experience}</td>
                  <td>{mentor.applied_date}</td>

                  <td>
  <span
    style={{
      padding: "6px 12px",
      borderRadius: "15px",
      fontSize: "12px",
      background:
        mentor.status === "approved"
          ? "#D4EDDA"
          : mentor.status === "rejected"
          ? "#F8D7DA"
          : "#FFF3CD",
    }}
  >
    {mentor.status}
  </span>
</td>

                  <td style={{ textAlign: "right" }}>
                    <button
                      style={styles.approveBtn}
                      onClick={() => handleApprove(mentor.id)}
                    >
                      Approve
                    </button>

                    <button
                      style={styles.rejectBtn}
                      onClick={() => handleReject(mentor.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MentorApproval;

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "20px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #636467",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  row: {
    borderBottom: "1px solid #E0E0E0",
  },

  centerText: {
    textAlign: "center",
    padding: "20px",
  },

  email: {
    fontSize: "12px",
    color: "#666",
  },

  pendingBadge: {
    background: "#FFF3CD",
    padding: "6px 12px",
    borderRadius: "15px",
    fontSize: "12px",
  },

  approveBtn: {
    background: "#666B64",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
  },

  rejectBtn: {
    background: "#F8D7DA",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};