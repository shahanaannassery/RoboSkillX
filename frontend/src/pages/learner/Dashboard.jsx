import { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FiPlay, FiMonitor, FiFolder, FiMessageSquare, FiBookOpen,
  FiBarChart2, FiStar, FiAward, FiBook, FiChevronRight,
  FiCheckCircle, FiCpu, FiZap,
} from "react-icons/fi";

const API = "http://localhost:8000";

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats] = useState(null);
const [courses] = useState([]);
const [activity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pull name from localStorage as reliable fallback
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); }
    catch { return {}; }
  })();

useEffect(() => {
  const loadProfile = async () => {
    const userName = localStorage.getItem("user_name");

    setProfile({
      first_name: userName,
    });

    setLoading(false);
  };

  loadProfile();
}, []);

  const quickAccess = [
    { label: "Continue Learning", icon: FiPlay, path: "/learner/courses" },
    { label: "Open Simulation Lab", icon: FiMonitor, path: "/learner/simulation" },
    { label: "View Projects", icon: FiFolder, path: "/learner/projects" },
    { label: "Ask Mentor", icon: FiMessageSquare, path: "/learner/mentors" },
    { label: "Go to Courses", icon: FiBookOpen, path: "/learner/courses" },
  ];

  const activityIcon = (type) => {
    if (!type) return <FiCheckCircle size={16} color="#26658C" />;
    const t = type.toLowerCase();
    if (t.includes("simulation")) return <FiCpu size={16} color="#26658C" />;
    if (t.includes("mentor")) return <FiMessageSquare size={16} color="#26658C" />;
    return <FiCheckCircle size={16} color="#26658C" />;
  };

  const levelBadgeColor = (level) => {
    if (!level) return "#26658C";
    const l = level.toLowerCase();
    if (l.includes("basic")) return "#2e7d32";
    if (l.includes("inter")) return "#e65100";
    if (l.includes("adv")) return "#6a1b9a";
    return "#26658C";
  };

  // Resolve display name: profile API > localStorage > fallback


  const progress = stats?.learning_progress ?? 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div style={s.loadingWrap}>
          <div style={s.spinnerRing} />
          <p style={s.loadingText}>Loading your dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={s.wrapper}>

        {/* ── WELCOME CARD ── */}
        <div style={s.welcomeCard}>
         <h2 style={s.welcomeTitle}>
  Welcome back, {profile?.first_name}
</h2>
          {(profile?.skill_level || storedUser?.skill_level) && (
            <p style={s.welcomeMeta}>
              Skill Level:{" "}
              <span style={{ color: "#26658C", fontWeight: 700 }}>
                {profile?.skill_level || storedUser?.skill_level}
              </span>
            </p>
          )}
          {(profile?.learning_goal || storedUser?.learning_goal) && (
            <p style={s.welcomeMeta}>
              Learning Goal:{" "}
              <span style={{ fontWeight: 700, color: "#1a3a4a" }}>
                {profile?.learning_goal || storedUser?.learning_goal}
              </span>
            </p>
          )}
        </div>

        {/* ── STAT CARDS ── */}
        <div style={s.statsRow}>
          <div style={s.statCard}>
            <div style={s.statIcon}><FiBarChart2 size={22} color="#26658C" /></div>
            <div>
              <p style={s.statLabel}>Learning Progress</p>
              <p style={s.statValue}>{progress}%</p>
              <div style={s.progressBar}>
                <div style={{ ...s.progressFill, width: `${Math.min(progress, 100)}%` }} />
              </div>
            </div>
          </div>

          <div style={s.statCard}>
            <div style={s.statIcon}><FiBook size={22} color="#26658C" /></div>
            <div>
              <p style={s.statLabel}>Courses Enrolled</p>
              <p style={s.statValue}>{stats?.courses_enrolled ?? "—"}</p>
            </div>
          </div>

          <div style={s.statCard}>
            <div style={s.statIcon}><FiStar size={22} color="#26658C" /></div>
            <div>
              <p style={s.statLabel}>Points Earned</p>
              <p style={s.statValue}>
                {stats?.points_earned != null
                  ? Number(stats.points_earned).toLocaleString()
                  : "—"}
              </p>
            </div>
          </div>

          <div style={s.statCard}>
            <div style={s.statIcon}><FiAward size={22} color="#26658C" /></div>
            <div>
              <p style={s.statLabel}>Badges Achieved</p>
              <p style={s.statValue}>{stats?.badges_achieved ?? "—"}</p>
            </div>
          </div>
        </div>

        {/* ── QUICK ACCESS ── */}
        <div style={s.sectionHeader}>
          <h3 style={s.sectionTitle}>Quick Access</h3>
        </div>
        <div style={s.quickRow}>
          
         {quickAccess.map(({ label, icon, path }) => {
  const QuickIcon = icon;
  return (
    <button
      key={label}
      style={s.quickBtn}
      onClick={() => navigate(path)}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#1a4f6e")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#26658C")}
    >
      <QuickIcon size={22} color="#fff" />
      <span style={s.quickLabel}>{label}</span>
    </button>
  );
})}
        </div>

        {/* ── RECOMMENDED COURSES ── */}
        <div style={s.sectionHeader}>
          <h3 style={s.sectionTitle}>Recommended Courses for You</h3>
          <button style={s.viewAllBtn} onClick={() => navigate("/learner/courses")}>
            View All <FiChevronRight size={14} />
          </button>
        </div>

        {courses.length === 0 ? (
          <div style={s.emptyBox}>
            No recommended courses yet.{" "}
            <span
              style={{ color: "#26658C", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/learner/courses")}
            >
              Browse all courses →
            </span>
          </div>
        ) : (
          <div style={s.coursesRow}>
            {courses.map((course) => (
              <div key={course.id} style={s.courseCard}>
                {course.thumbnail ? (
                  <img
                    src={`${API}${course.thumbnail}`}
                    alt={course.title}
                    style={s.courseImg}
                  />
                ) : (
                  <div style={s.courseImgPlaceholder}>
                    <FiZap size={32} color="#fff" />
                  </div>
                )}
                <div style={s.courseBody}>
                  <h4 style={s.courseTitle}>{course.title}</h4>
                  <div style={s.courseMeta}>
                    {course.level && (
                      <span style={{ ...s.levelBadge, background: levelBadgeColor(course.level) }}>
                        {course.level}
                      </span>
                    )}
                    {course.total_sessions && (
                      <span style={s.metaChip}>
                        <FiBookOpen size={11} /> {course.total_sessions} sessions
                      </span>
                    )}
                    {course.duration && (
                      <span style={s.metaChip}>{course.duration}</span>
                    )}
                  </div>
                  <button
                    style={s.enrollBtn}
                    onClick={() => navigate(`/learner/courses/${course.id}`)}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1a4f6e")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#26658C")}
                  >
                    {course.enrolled ? "Continue" : "Enroll Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── RECENT ACTIVITY ── */}
        <div style={s.sectionHeader}>
          <h3 style={s.sectionTitle}>Recent Activity</h3>
        </div>

        <div style={s.activityCard}>
          {activity.length === 0 ? (
            <p style={s.emptyText}>No recent activity yet.</p>
          ) : (
            activity.map((item, i) => (
              <div
                key={i}
                style={{
                  ...s.activityRow,
                  borderBottom: i < activity.length - 1 ? "1px solid #e8f0f4" : "none",
                }}
              >
                <div style={s.activityDot}>{activityIcon(item.type)}</div>
                <div>
                  <p style={s.activityTitle}>{item.title || item.description || "Activity"}</p>
                  <p style={s.activityTime}>{item.time_ago || item.created_at || ""}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;

/* ===== STYLES ===== */
const s = {
  wrapper: {
    padding: "28px 32px",
    background: "#b8dde0",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },

  loadingWrap: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    minHeight: "60vh", gap: "16px",
  },
  spinnerRing: {
    width: "36px", height: "36px",
    border: "3px solid #d0e8ec",
    borderTop: "3px solid #26658C",
    borderRadius: "50%",
  },
  loadingText: { color: "#26658C", fontSize: "14px", fontWeight: "500" },

  welcomeCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px 28px",
    marginBottom: "20px",
    border: "1px solid #d6eaee",
    boxShadow: "0 2px 10px rgba(38,101,140,0.07)",
  },
  welcomeTitle: {
    fontSize: "22px", fontWeight: "700",
    color: "#1a3a4a", margin: "0 0 8px 0",
  },
  welcomeMeta: { fontSize: "14px", color: "#4a6a7a", margin: "4px 0" },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    border: "1px solid #d6eaee",
    boxShadow: "0 2px 8px rgba(38,101,140,0.06)",
  },
  statIcon: {
    width: "44px", height: "44px", borderRadius: "12px",
    background: "#e8f4f8",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  statLabel: { fontSize: "13px", color: "#6a8a9a", margin: "0 0 4px 0" },
  statValue: { fontSize: "26px", fontWeight: "700", color: "#1a3a4a", margin: 0 },
  progressBar: {
    marginTop: "8px", height: "6px",
    background: "#d6eaee", borderRadius: "4px", width: "120px",
  },
  progressFill: {
    height: "100%", background: "#26658C",
    borderRadius: "4px", transition: "width 0.6s ease",
  },

  sectionHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "14px",
  },
  sectionTitle: {
    fontSize: "17px", fontWeight: "700",
    color: "#1a3a4a", margin: 0,
  },
  viewAllBtn: {
    display: "flex", alignItems: "center", gap: "4px",
    background: "transparent", border: "none",
    color: "#26658C", fontWeight: "600", fontSize: "13px",
    cursor: "pointer",
  },

  quickRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "12px",
    marginBottom: "28px",
  },
  quickBtn: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: "10px",
    padding: "20px 12px",
    background: "#26658C",
    border: "none", borderRadius: "14px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  quickLabel: {
    color: "#fff", fontSize: "13px",
    fontWeight: "600", textAlign: "center", lineHeight: "1.3",
  },

  coursesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "28px",
  },
  courseCard: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #d6eaee",
    boxShadow: "0 2px 10px rgba(38,101,140,0.07)",
    display: "flex", flexDirection: "column",
  },
  courseImg: { width: "100%", height: "160px", objectFit: "cover" },
  courseImgPlaceholder: {
    width: "100%", height: "160px",
    background: "linear-gradient(135deg, #26658C, #1a3a4a)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  courseBody: { padding: "16px", flex: 1, display: "flex", flexDirection: "column" },
  courseTitle: {
    fontSize: "16px", fontWeight: "700",
    color: "#1a3a4a", margin: "0 0 10px 0",
  },
  courseMeta: {
    display: "flex", alignItems: "center",
    gap: "8px", marginBottom: "14px", flexWrap: "wrap",
  },
  levelBadge: {
    color: "#fff", fontSize: "11px", fontWeight: "700",
    padding: "3px 10px", borderRadius: "20px",
  },
  metaChip: {
    display: "flex", alignItems: "center", gap: "4px",
    fontSize: "12px", color: "#6a8a9a",
  },
  enrollBtn: {
    width: "100%", padding: "11px",
    background: "#26658C", color: "#fff",
    border: "none", borderRadius: "10px",
    fontWeight: "600", fontSize: "14px",
    cursor: "pointer", marginTop: "auto",
    transition: "background 0.2s",
  },

  activityCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "8px 0",
    border: "1px solid #d6eaee",
    boxShadow: "0 2px 10px rgba(38,101,140,0.07)",
    marginBottom: "20px",
  },
  activityRow: {
    display: "flex", alignItems: "flex-start",
    gap: "14px", padding: "16px 22px",
  },
  activityDot: {
    width: "32px", height: "32px", borderRadius: "50%",
    background: "#e8f4f8",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, marginTop: "2px",
  },
  activityTitle: {
    fontSize: "14px", fontWeight: "600",
    color: "#1a3a4a", margin: "0 0 3px 0",
  },
  activityTime: { fontSize: "12px", color: "#8aaabb", margin: 0 },

  emptyBox: {
    background: "#fff", borderRadius: "16px",
    padding: "32px", textAlign: "center",
    color: "#8aaabb", fontSize: "14px",
    marginBottom: "20px",
  },
  emptyText: {
    textAlign: "center", color: "#8aaabb",
    fontSize: "14px", padding: "20px", margin: 0,
  },
};