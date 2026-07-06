import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiClock, FiFolder, FiVideo, FiFileText,
  FiZap, FiTool, FiHelpCircle, FiBookOpen, FiPaperclip, FiCheck
} from "react-icons/fi";

const API_URL = "http://localhost:8000";

function SessionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/admin/sessions/${id}/`);
        setSession(res.data);
        // console.log("SESSION DATA:", res.data);
        // console.log("FULL DATA", res.data);

// console.log("VIDEO", res.data.video);
// console.log("MATERIALS", res.data.materials);
// console.log("CIRCUIT", res.data.circuit_diagram);
// console.log("QUIZZES", res.data.quizzes);

      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [id]);

  if (!session) {
    return (
      <div style={styles.loadingWrapper}>
        <p style={styles.loadingText}>Loading session...</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>

      {/* PAGE HEADER */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Session details</h1>
          <p style={styles.pageSubtitle}>
            View session content, resources, project details and quiz information.
          </p>
        </div>
        <button style={styles.backButton} onClick={() => navigate("/admin/sessions")}>
          <FiArrowLeft size={15} />
          Back to sessions
        </button>
      </div>

      {/* HERO CARD */}
      <div style={styles.heroCard}>
        <div style={styles.sessionTitleRow}>
          <div style={styles.sessionIcon}>
            <FiBookOpen size={18} color="#059669" />
          </div>
          <span style={styles.sessionName}>{session.title}</span>
        </div>
        <p style={styles.sessionDesc}>{session.description}</p>
        <div style={styles.metaGrid}>
          <div style={styles.metaBox}>
            <div style={styles.metaLabel}>
              <FiClock size={13} style={{ marginRight: 5 }} />
              Duration
            </div>
            <div style={styles.metaValue}>{session.duration || "—"}</div>
          </div>
          <div style={styles.metaBox}>
            <div style={styles.metaLabel}>
              <FiFolder size={13} style={{ marginRight: 5 }} />
              Project
            </div>
            <div style={styles.metaValue}>{session.project_title || "No project"}</div>
          </div>
        </div>
      </div>

      {/* VIDEO */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <FiVideo size={16} color="#6B7280" />
          <span style={styles.sectionTitle}>Video</span>
        </div>
        <div style={styles.sectionBody}>
          {session.video ? (
            <video controls style={styles.media}>
  <source
    src={`${API_URL}${session.video}`}
    type="video/mp4"
  />
</video>
          ) : (
            <div style={styles.emptyMedia}>
              <FiVideo size={28} color="#D1D5DB" />
              <p style={{ marginTop: 8 }}>No video uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* NOTES */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <FiFileText size={16} color="#6B7280" />
          <span style={styles.sectionTitle}>Notes / materials</span>
        </div>
        <div style={styles.sectionBody}>
          {session.materials ? (
            <a
  href={`${API_URL}${session.materials}`}
  target="_blank"
  rel="noreferrer"
  style={styles.pdfLink}
>
  Open PDF
</a>
          ) : (
            <div style={styles.emptyMedia}>
              <FiFileText size={28} color="#D1D5DB" />
              <p style={{ marginTop: 8 }}>No materials uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* CIRCUIT */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <FiZap size={16} color="#6B7280" />
          <span style={styles.sectionTitle}>Circuit diagram</span>
        </div>
        <div style={styles.sectionBody}>
          {session.circuit_diagram ? (
           <img
  src={`${API_URL}${session.circuit_diagram}`}
  alt="Circuit"
  style={styles.media}
/>
          ) : (
            <div style={styles.emptyMedia}>
              <FiZap size={28} color="#D1D5DB" />
              <p style={{ marginTop: 8 }}>No circuit diagram uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* PROJECT */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <FiTool size={16} color="#6B7280" />
          <span style={styles.sectionTitle}>Project</span>
        </div>
        <div style={styles.sectionBody}>
          {session.project_title ? (
            <>
              <p style={styles.projectTitle}>{session.project_title}</p>
              <p style={styles.projectDesc}>{session.project_description}</p>
            </>
          ) : (
            <div style={styles.emptyMedia}>
              <FiTool size={28} color="#D1D5DB" />
              <p style={{ marginTop: 8 }}>No project assigned</p>
            </div>
          )}
        </div>
      </div>

      {/* QUIZ */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <FiHelpCircle size={16} color="#6B7280" />
          <span style={styles.sectionTitle}>Quiz questions</span>
        </div>
        <div style={styles.sectionBody}>
          {session.quizzes && session.quizzes.length > 0 ? (
            session.quizzes.map((quiz, index) => (
              <div key={quiz.id} style={styles.quizCard}>
                <p style={styles.quizQuestion}>
                  {index + 1}. {quiz.question}
                </p>
                <div style={styles.quizOptions}>
                  {["a", "b", "c", "d"].map((opt) => (
                    <div
                      key={opt}
                      style={{
                        ...styles.quizOpt,
                        ...(quiz.correct_answer?.toLowerCase() === opt ? styles.quizOptCorrect : {}),
                      }}
                    >
                      <span
                        style={{
                          ...styles.optBadge,
                          ...(quiz.correct_answer?.toLowerCase() === opt ? styles.optBadgeCorrect : {}),
                        }}
                      >
                        {opt.toUpperCase()}
                      </span>
                      {quiz[`option_${opt}`]}
                    </div>
                  ))}
                </div>
                <div style={styles.correctBadge}>
                  <FiCheck size={13} />
                  Correct answer: {quiz.correct_answer}
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyMedia}>
              <FiHelpCircle size={28} color="#D1D5DB" />
              <p style={{ marginTop: 8 }}>No quiz questions</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default SessionDetails;

const styles = {
  loadingWrapper: {
    display: "flex", alignItems: "center", justifyContent: "center",
    minHeight: "100vh", background: "#F3F4F6",
  },
  loadingText: { fontSize: "15px", color: "#6B7280" },

  wrapper: { padding: "28px", background: "#F3F4F6", minHeight: "100vh" },

  pageHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: "20px", gap: "12px", flexWrap: "wrap",
  },
  pageTitle: { fontSize: "22px", fontWeight: "700", color: "#111827", margin: 0 },
  pageSubtitle: { fontSize: "14px", color: "#6B7280", marginTop: "5px" },
  backButton: {
    display: "flex", alignItems: "center", gap: "7px",
    padding: "9px 16px", border: "1px solid #D1D5DB",
    borderRadius: "8px", background: "#fff", color: "#374151",
    fontSize: "13px", fontWeight: "500", cursor: "pointer",
  },

  heroCard: {
    background: "#fff", border: "1px solid #E5E7EB",
    borderRadius: "12px", padding: "20px", marginBottom: "12px",
  },
  sessionTitleRow: {
    display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px",
  },
  sessionIcon: {
    width: "36px", height: "36px", borderRadius: "8px",
    background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center",
  },
  sessionName: { fontSize: "17px", fontWeight: "600", color: "#111827" },
  sessionDesc: { fontSize: "14px", color: "#6B7280", lineHeight: "1.6", marginBottom: "16px" },

  metaGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px",
  },
  metaBox: { background: "#F9FAFB", borderRadius: "8px", padding: "12px" },
  metaLabel: {
    display: "flex", alignItems: "center",
    fontSize: "12px", color: "#9CA3AF", marginBottom: "5px",
  },
  metaValue: { fontSize: "14px", fontWeight: "600", color: "#111827" },

  section: {
    background: "#fff", border: "1px solid #E5E7EB",
    borderRadius: "12px", marginBottom: "12px", overflow: "hidden",
  },
  sectionHeader: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "14px 20px", borderBottom: "1px solid #F3F4F6",
  },
  sectionTitle: { fontSize: "14px", fontWeight: "600", color: "#374151" },
  sectionBody: { padding: "20px" },

 media: {
  width: "100%",
  maxWidth: "700px",
  maxHeight: "400px",
  objectFit: "contain",
  borderRadius: "8px",
  display: "block",
  margin: "0 auto",
},
  emptyMedia: {
    background: "#F9FAFB", borderRadius: "8px", padding: "40px",
    textAlign: "center", color: "#9CA3AF", fontSize: "13px",
    display: "flex", flexDirection: "column", alignItems: "center",
  },

  pdfLink: {
    display: "inline-flex", alignItems: "center", gap: "7px",
    padding: "8px 14px", border: "1px solid #D1D5DB", borderRadius: "8px",
    fontSize: "13px", fontWeight: "500", color: "#374151",
    textDecoration: "none", background: "#F9FAFB",
  },

  projectTitle: { fontSize: "15px", fontWeight: "600", color: "#111827", marginBottom: "6px" },
  projectDesc: { fontSize: "14px", color: "#6B7280", lineHeight: "1.6" },

  quizCard: {
    border: "1px solid #E5E7EB", borderRadius: "10px",
    padding: "16px", marginBottom: "10px",
  },
  quizQuestion: {
    fontSize: "14px", fontWeight: "500", color: "#111827",
    marginBottom: "12px", lineHeight: "1.5",
  },
  quizOptions: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "12px",
  },
  quizOpt: {
    background: "#F9FAFB", borderRadius: "8px", padding: "8px 10px",
    fontSize: "13px", color: "#374151", display: "flex", alignItems: "center", gap: "8px",
    border: "1px solid transparent",
  },
  quizOptCorrect: {
    background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#065F46",
  },
  optBadge: {
    width: "20px", height: "20px", borderRadius: "4px",
    background: "#E5E7EB", color: "#6B7280", fontSize: "11px",
    fontWeight: "600", display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0,
  },
  optBadgeCorrect: {
    background: "#059669", color: "#fff",
  },
  correctBadge: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    background: "#ECFDF5", color: "#065F46", fontSize: "12px",
    fontWeight: "500", padding: "4px 10px", borderRadius: "6px",
  },
};