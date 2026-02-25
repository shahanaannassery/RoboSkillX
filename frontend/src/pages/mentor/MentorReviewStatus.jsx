import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/axios";

function MentorReviewStatus() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("pending");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get("mentors/my-status/");
        setStatus(res.data.status);
        setRejectionReason(res.data.rejection_reason);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatus();
  }, []);

  // Auto redirect if approved
  useEffect(() => {
    if (status === "approved") {
      navigate("/mentor/dashboard");
    }
  }, [status, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/mentor/login");
  };

  const handleRetry = () => {
    navigate("/mentor/profile-setup");
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🤖</div>
          <div style={styles.logoText}>RoboSkillX</div>
        </div>

        <div style={styles.headerRight}>Mentor Verification</div>
      </div>

      {/* CENTER */}
      <div style={styles.center}>
        <div style={styles.card}>

          <h2 style={styles.title}>
            {status === "rejected"
              ? "Profile Review Required"
              : "Profile Under Review"}
          </h2>

          {/* PENDING */}
          {status === "pending" && (
            <div style={styles.infoBox}>
              Your mentor profile is currently under admin review.
              Please wait while we verify your details.
            </div>
          )}

          {/* REJECTED */}
          {status === "rejected" && (
            <>
              <div style={styles.rejectedBox}>
                <strong>Profile Rejected</strong>
                <p>Your mentor profile could not be approved at this time.</p>
              </div>

              {rejectionReason && (
                <div style={styles.commentBox}>
                  <strong>Admin Comments:</strong>
                  <p>{rejectionReason}</p>
                </div>
              )}
            </>
          )}

          {/* BUTTONS */}
          {status === "rejected" && (
            <button style={styles.primaryBtn} onClick={handleRetry}>
              ✏ Edit Profile & Resubmit
            </button>
          )}

          <button style={styles.secondaryBtn} onClick={handleLogout}>
            ⬅ Cancel / Logout
          </button>

        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © 2025 RoboSkillX. All rights reserved.
      </div>
    </div>
  );
}

export default MentorReviewStatus;

       

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#A7EBF2",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', sans-serif",
  },

  header: {
    background: "#8FD6DE",
    padding: "14px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #54ACBF",
  },

  logoWrap: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  logoIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "#26658C",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontWeight: 700,
    fontSize: "18px",
    color: "#011C40",
  },

  headerRight: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#011C40",
  },

  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },

  card: {
    background: "#fff",
    padding: "40px",
    width: "520px",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#011C40",
    marginBottom: "20px",
  },

  infoBox: {
    background: "#E3F2F5",
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "25px",
    fontSize: "14px",
    color: "#023859",
  },

  rejectedBox: {
    background: "#E6F3F7",
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "20px",
    color: "#023859",
  },

  commentBox: {
    background: "#F5F5F5",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "25px",
    fontSize: "14px",
  },

  primaryBtn: {
    width: "100%",
    padding: "14px",
    background: "#26658C",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 600,
    marginBottom: "12px",
  },

  secondaryBtn: {
    width: "100%",
    padding: "14px",
    background: "#54ACBF",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 500,
  },

  footer: {
    background: "#8FD6DE",
    padding: "14px",
    textAlign: "center",
    fontSize: "12px",
    color: "#023859",
  },
};