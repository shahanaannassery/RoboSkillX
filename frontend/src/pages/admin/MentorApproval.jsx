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
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>Mentor Approval</h1>
        <p style={styles.subtitle}>
          Review and manage mentor applications.
        </p>
      </div>
    </div>

    <div style={styles.statsContainer}>
      <div style={styles.statCard}>
        <h3>{mentors.length}</h3>
        <p>Total Applications</p>
      </div>

      <div style={styles.statCard}>
        <h3>
          {mentors.filter((m) => m.status === "approved").length}
        </h3>
        <p>Approved</p>
      </div>

      <div style={styles.statCard}>
        <h3>
          {mentors.filter((m) => m.status === "pending").length}
        </h3>
        <p>Pending</p>
      </div>

      <div style={styles.statCard}>
        <h3>
          {mentors.filter((m) => m.status === "rejected").length}
        </h3>
        <p>Rejected</p>
      </div>
    </div>

    <div style={styles.card}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>App ID</th>
            <th style={styles.th}>Mentor</th>
            <th style={styles.th}>Expertise</th>
            <th style={styles.th}>Experience</th>
            <th style={styles.th}>Applied Date</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
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
                No mentor applications found
              </td>
            </tr>
          ) : (
            mentors.map((mentor) => (
              <tr key={mentor.id} style={styles.row}>
                <td style={styles.td}>#{mentor.id}</td>

                <td style={styles.td}>
                  <div>
                    <div style={styles.name}>
                      {mentor.name}
                    </div>
                    <div style={styles.email}>
                      {mentor.email}
                    </div>
                  </div>
                </td>

                <td style={styles.td}>
                  {mentor.primary_expertise}
                </td>

                <td style={styles.td}>
                  {mentor.experience}
                </td>

                <td style={styles.td}>
                  {mentor.applied_date}
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background:
                        mentor.status === "approved"
                          ? "#DCFCE7"
                          : mentor.status === "rejected"
                          ? "#FEE2E2"
                          : "#FEF3C7",
                      color:
                        mentor.status === "approved"
                          ? "#166534"
                          : mentor.status === "rejected"
                          ? "#B91C1C"
                          : "#92400E",
                    }}
                  >
                    {mentor.status}
                  </span>
                </td>

                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.approveBtn}
                      onClick={() =>
                        handleApprove(mentor.id)
                      }
                    >
                      Approve
                    </button>

                    <button
                      style={styles.rejectBtn}
                      onClick={() =>
                        handleReject(mentor.id)
                      }
                    >
                      Reject
                    </button>
                  </div>
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
    padding: "32px",
    background: "#F8FAFC",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "24px",
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#111827",
  },

  subtitle: {
    color: "#6B7280",
    fontSize: "15px",
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },

  statCard: {
    background: "#FFFFFF",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    textAlign: "center",
  },

  card: {
    background: "#FFFFFF",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "18px",
    background: "#F9FAFB",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    borderBottom: "1px solid #E5E7EB",
  },

  td: {
    padding: "18px",
    borderBottom: "1px solid #F1F5F9",
    verticalAlign: "middle",
  },

  row: {
    transition: "0.2s",
  },

  name: {
    fontWeight: "600",
    color: "#111827",
    marginBottom: "4px",
  },

  email: {
    fontSize: "13px",
    color: "#6B7280",
  },

  centerText: {
    textAlign: "center",
    padding: "40px",
    color: "#6B7280",
  },

  statusBadge: {
    padding: "7px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
  },

  approveBtn: {
  background: "#171F22",
  color: "#FFFFFF",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
},

rejectBtn: {
  background: "#C1D1CF",
  color: "#171F22",
  border: "1px solid #AAB8B6",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
},
};