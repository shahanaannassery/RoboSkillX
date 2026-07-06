import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Clock,
  Hash,
  BookOpen,
  PlayCircle,
  FileText,
  Cpu,
  Layers,
  TrendingUp,
  Download,
  CheckCircle2,
  ClipboardList,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const API = "http://localhost:8000";


function LearnerSessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`${API}/api/learners/sessions/${id}/`, {
          credentials: "include",
        });
        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div style={styles.centerState}>
          <div style={styles.spinnerWrap}>
            <div style={styles.spinner} />
          </div>
          <p style={styles.centerText}>Loading session…</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!session) {
    return (
      <DashboardLayout>
        <div style={styles.centerState}>
          <AlertCircle size={40} color="#54ACBF" />
          <p style={styles.centerText}>Session not found.</p>
        </div>
      </DashboardLayout>
    );
  }
const handleComplete = async () => {
  try {
    const res = await fetch(
      
      `${API}/api/learners/sessions/${id}/complete/`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();
    setSession((prev) => ({
  ...prev,
  progress: data.progress,
}));
setCompleted(true);
  toast.success(
  `${data.message} | Progress: ${data.progress}%`
);
  } catch (err) {
  console.log(err);

  toast.error("Failed to mark session as completed");
}
};
  return (
    <DashboardLayout>
      <div style={styles.page}>

        {/* ── Hero Header ── */}
        <div style={styles.hero}>
          <div style={styles.heroInner}>
            <div style={styles.heroBadge}>
              <BookOpen size={14} />
              Session
            </div>
            <h1 style={styles.heroTitle}>{session.title}</h1>
            {session.description && (
              <p style={styles.heroDesc}>{session.description}</p>
            )}
          </div>

          <div style={styles.statRow}>
            <StatChip icon={<Clock size={15} />} label="Duration" value={session.duration || "—"} />
            <StatChip icon={<Hash size={15} />} label="Session" value={`#${session.id}`} />
            <StatChip
              icon={<TrendingUp size={15} />}
              label="Status"
              value="In Progress"
              accent
            />
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div style={styles.body}>

          {/* Left column */}
          <div style={styles.mainCol}>

            {/* Video */}
            <Section icon={<PlayCircle size={18} color="#26658C" />} title="Video Lesson">
              {session.video ? (
                <video controls style={styles.video}>
                  <source src={`${API}${session.video}`} type="video/mp4" />
                </video>
              ) : (
                <Empty message="No video has been uploaded for this session." />
              )}
            </Section>

            {/* Circuit Diagram */}
            <Section icon={<Cpu size={18} color="#26658C" />} title="Circuit Diagram">
              {session.circuit_diagram ? (
                <img
                  src={`${API}${session.circuit_diagram}`}
                  alt="Circuit Diagram"
                  style={styles.diagram}
                />
              ) : (
                <Empty message="No circuit diagram has been uploaded." />
              )}
            </Section>

            {/* Project */}
            <Section icon={<Layers size={18} color="#26658C" />} title="Project Activity">
              {session.project_title ? (
                <div style={styles.projectBox}>
                  <p style={styles.projectTitle}>{session.project_title}</p>
                  {session.project_description && (
                    <p style={styles.projectDesc}>{session.project_description}</p>
                  )}
                </div>
              ) : (
                <Empty message="No project assigned to this session." />
              )}
            </Section>

          </div>

          {/* Right column (sidebar) */}
          <div style={styles.sidebar}>

            {/* Learning Material */}
            <Section icon={<FileText size={18} color="#26658C" />} title="Learning Material">
              {session.materials ? (
                <a
                  href={`${API}${session.materials}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.downloadBtn}
                >
                  <Download size={15} />
                  Download PDF
                </a>
              ) : (
                <Empty message="No materials available." />
              )}
            </Section>

            {/* Progress */}
            <Section icon={<TrendingUp size={18} color="#26658C" />} title="Your Progress">
              <div style={styles.progressLabel}>
                <span style={styles.progressText}>Completion</span>
                <span style={styles.progressPct}>
  {session.progress || 0}%
</span>
              </div>
              <div style={styles.progressTrack}>
               <div
  style={{
    ...styles.progressFill,
    width: `${session.progress || 0}%`,
  }}
/>
              </div>
              <p style={styles.progressHint}>Complete the quiz to mark progress.</p>
            </Section>

            {/* Actions */}
            <div style={styles.actionStack}>
              <button
  style={styles.quizBtn}
  onClick={() => navigate(`/learner/session/${id}/quiz`)}
>
  <ClipboardList size={16} />
  Start Quiz
  <ChevronRight size={15} style={{ marginLeft: "auto" }} />
</button><button
  style={styles.completeBtn}
  onClick={handleComplete}
  disabled={completed}
>
  {completed
    ? "Completed "
    : "Mark as Complete"}
</button>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ── Sub-components ── */

function Section({ icon, title, children }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        {icon}
        <h2 style={styles.cardTitle}>{title}</h2>
      </div>
      <div style={styles.cardBody}>{children}</div>
    </div>
  );
}

function StatChip({ icon, label, value, accent }) {
  return (
    <div style={{ ...styles.statChip, ...(accent ? styles.statChipAccent : {}) }}>
      <span style={styles.statIcon}>{icon}</span>
      <div>
        <div style={styles.statLabel}>{label}</div>
        <div style={styles.statValue}>{value}</div>
      </div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div style={styles.emptyBox}>
      <AlertCircle size={18} color="#94BFCC" />
      <span>{message}</span>
    </div>
  );
}

export default LearnerSessionDetails;

/* ── Styles ── */
const styles = {
  page: {
    padding: "28px 24px",
    background: "#EEF8FA",
    minHeight: "100vh",
  },

  /* Loading / Error */
  centerState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "16px",
  },
  spinnerWrap: {
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: 36,
    height: 36,
    border: "3px solid #C9E8EF",
    borderTop: "3px solid #26658C",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  centerText: {
    color: "#023859",
    fontSize: 16,
  },

  /* Hero */
  hero: {
    background: "linear-gradient(135deg, #011C40 0%, #26658C 100%)",
    borderRadius: "18px",
    padding: "32px 28px 24px",
    marginBottom: "24px",
    color: "#fff",
  },
  heroInner: {
    marginBottom: "24px",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.12)",
    color: "#A7EBF2",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "26px",
    fontWeight: 700,
    margin: "0 0 10px",
    color: "#fff",
    lineHeight: 1.3,
  },
  heroDesc: {
    color: "rgba(255,255,255,0.72)",
    fontSize: "15px",
    lineHeight: 1.7,
    margin: 0,
    maxWidth: "640px",
  },
  statRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  statChip: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "12px",
    padding: "10px 16px",
    backdropFilter: "blur(6px)",
  },
  statChipAccent: {
    background: "rgba(167,235,242,0.15)",
    border: "1px solid rgba(167,235,242,0.3)",
  },
  statIcon: {
    color: "#A7EBF2",
    display: "flex",
  },
  statLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.55)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 600,
  },
  statValue: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#fff",
    marginTop: "2px",
  },

  /* Layout */
  body: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "20px",
    alignItems: "start",
  },
  mainCol: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "sticky",
    top: "24px",
  },

  /* Card */
  card: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #D6EEF3",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(1,28,64,0.06)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 20px",
    borderBottom: "1px solid #EEF6F8",
    background: "#FAFEFF",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#011C40",
    margin: 0,
  },
  cardBody: {
    padding: "20px",
  },

  /* Media */
  video: {
    width: "100%",
    borderRadius: "10px",
    background: "#000",
    display: "block",
  },
  diagram: {
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #D6EEF3",
    display: "block",
  },

  /* Download */
  downloadBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#011C40",
    color: "#fff",
    padding: "11px 18px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
    transition: "background 0.2s",
  },

  /* Empty state */
  emptyBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#F4FBFC",
    border: "1px dashed #B0D9E4",
    borderRadius: "10px",
    padding: "16px",
    color: "#6B9BAD",
    fontSize: "14px",
  },

  /* Project */
  projectBox: {
    background: "#F4FBFC",
    borderRadius: "10px",
    padding: "16px 18px",
    border: "1px solid #D6EEF3",
  },
  projectTitle: {
    fontWeight: 700,
    color: "#011C40",
    fontSize: "15px",
    margin: "0 0 8px",
  },
  projectDesc: {
    color: "#4A7A8F",
    fontSize: "14px",
    lineHeight: 1.7,
    margin: 0,
  },

  /* Progress */
  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  progressText: {
    fontSize: "13px",
    color: "#4A7A8F",
    fontWeight: 600,
  },
  progressPct: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#011C40",
  },
  progressTrack: {
    width: "100%",
    height: "8px",
    background: "#D6EEF3",
    borderRadius: "20px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #26658C, #54ACBF)",
    borderRadius: "20px",
    transition: "width 0.6s ease",
  },
  progressHint: {
    fontSize: "12px",
    color: "#94BFCC",
    marginTop: "8px",
  },

  /* Action buttons */
  actionStack: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  quizBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "13px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    width: "100%",
    textAlign: "left",
  },
  completeBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    color: "#1A7A40",
    border: "1.5px solid #1A7A40",
    padding: "13px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    width: "100%",
    textAlign: "left",
  },
};