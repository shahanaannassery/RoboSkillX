import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  BookOpen,
  BarChart2,
  UserCheck,
  CheckCircle,
  ChevronRight,
  Loader2,
  GraduationCap,
  PlayCircle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const API = "http://localhost:8000";

function LearnerCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API}/api/learners/courses/${id}/`, {
          credentials: "include",
        });
        const data = await res.json();
        
        setCourse(data);

        // console.log(data.sessions);
        
        setEnrolled(data.is_enrolled || false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const res = await fetch(`${API}/api/learners/courses/${id}/enroll/`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setEnrolled(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={styles.loadingScreen}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Loading course details…</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div style={styles.loadingScreen}>
          <p style={styles.loadingText}>Course not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  const levelColors = {
    Beginner: { bg: "#DCFCE7", color: "#166534" },
    Intermediate: { bg: "#FEF9C3", color: "#854D0E" },
    Advanced: { bg: "#FEE2E2", color: "#991B1B" },
  };
  const levelStyle = levelColors[course.level] || { bg: "#EFF6FF", color: "#1E40AF" };

  return (
    <DashboardLayout>
      <div style={styles.page}>

        {/* ── Hero Banner ── */}
        <div style={styles.heroWrapper}>
         <img
  src={course.thumbnail}
  alt={course.title}
  style={styles.heroImage}
/>
          <div style={styles.heroOverlay} />
          <div style={styles.heroContent}>
            <span style={{ ...styles.levelBadge, background: levelStyle.bg, color: levelStyle.color }}>
              {course.level}
            </span>
            <h1 style={styles.heroTitle}>{course.title}</h1>
            <div style={styles.heroMeta}>
              <span style={styles.metaChip}><Clock size={13} style={{ marginRight: 5, verticalAlign: "middle" }} />{course.duration}</span>
              <span style={styles.metaChip}><BookOpen size={13} style={{ marginRight: 5, verticalAlign: "middle" }} />{course.total_sessions} Sessions</span>
              {course.mentor_names?.length > 0 && (
                <span style={styles.metaChip}><GraduationCap size={13} style={{ marginRight: 5, verticalAlign: "middle" }} />{course.mentor_names[0]}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Body Grid ── */}
        <div style={styles.body}>

          {/* Left Column */}
          <div style={styles.leftCol}>

            {/* About */}
            <section style={styles.card}>
              <h2 style={styles.cardTitle}>About this Course</h2>
              <p style={styles.cardBody}>{course.description}</p>
            </section>

            {/* Stats Row */}
            <div style={styles.statsRow}>
              {[
                { label: "Level", value: course.level, icon: <BarChart2 size={22} color="#1D4ED8" /> },
                { label: "Duration", value: course.duration, icon: <Clock size={22} color="#1D4ED8" /> },
                { label: "Sessions", value: course.total_sessions, icon: <BookOpen size={22} color="#1D4ED8" /> },
              ].map((stat) => (
                <div key={stat.label} style={styles.statCard}>
                  <span style={styles.statIcon}>{stat.icon}</span>
                  <span style={styles.statValue}>{stat.value}</span>
                  <span style={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Curriculum */}
            <section style={styles.card}>
              <h2 style={styles.cardTitle}>Course Curriculum</h2>
              <p style={styles.curriculumMeta}>
                {course.sessions?.length || 0} sessions
              </p>
              <div>
                {course.sessions?.length > 0 ? (
                  course.sessions.map((session, index) => (
                    <div key={session.id} style={styles.sessionRow}>
                      <div style={styles.sessionLeft}>
                        <div
  style={{
    ...styles.sessionIndex,
    background: session.completed
      ? "#DCFCE7"
      : "#EFF6FF",
    color: session.completed
      ? "#166534"
      : "#1D4ED8",
  }}
>
  {session.completed ? "✓" : index + 1}
</div>
                        <div>
                          <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <p style={styles.sessionTitle}>
    {session.title}
  </p>

  {session.completed && (
    <span
      style={{
        background: "#DCFCE7",
        color: "#166534",
        padding: "3px 8px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "600",
      }}
    >
      Completed
    </span>
  )}
</div>
                          <p style={styles.sessionDuration}><Clock size={11} style={{ marginRight: 4, verticalAlign: "middle" }} />{session.duration}</p>
                        </div>
                      </div>
                      <button
                        style={styles.viewBtn}
                        onClick={() => navigate(`/learner/session/${session.id}`)}
                      >
                        View <ChevronRight size={13} style={{ verticalAlign: "middle" }} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#6B7280", fontSize: "14px" }}>No sessions available yet.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside style={styles.sidebar}>

            {/* Sticky Enroll Card */}
            <div style={styles.enrollCard}>
              <img
  src={course.thumbnail}
  alt={course.title}
  style={styles.heroImage}
/>
              <div style={styles.enrollBody}>
                <p style={styles.enrollCourseTitle}>{course.title}</p>
                <div style={styles.enrollMeta}>
                  <span><Clock size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />{course.duration}</span>
                  <span><BookOpen size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />{course.total_sessions} Sessions</span>
                </div>
                <button
                  style={{
                    ...styles.enrollBtn,
                    ...(enrolled ? styles.enrolledBtn : {}),
                    ...(enrolling ? styles.enrollingBtn : {}),
                  }}
                  onClick={enrolled ? undefined : handleEnroll}
                  disabled={enrolling || enrolled}
                >
                  {enrolled ? (
                    <><CheckCircle size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />Enrolled</>
                  ) : enrolling ? (
                    <><Loader2 size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />Enrolling…</>
                  ) : (
                    <><PlayCircle size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />Enroll Now</>
                  )}
                </button>
                {enrolled && (
                  <button
                    style={styles.startBtn}
                    onClick={() =>
                      course.sessions?.[0] &&
                      navigate(`/learner/session/${course.sessions[0].id}`)
                    }
                  >
                    Start Learning <ChevronRight size={14} style={{ verticalAlign: "middle" }} />
                  </button>
                )}
              </div>
            </div>

            {/* Mentors */}
            {course.mentor_names?.length > 0 && (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>Mentors</h2>
                {course.mentor_names.map((mentor, index) => (
                  <div key={index} style={styles.mentorRow}>
                    <div style={styles.mentorAvatar}>
                      {mentor.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={styles.mentorName}>{mentor}</p>
                  <p style={styles.mentorRole}><UserCheck size={11} style={{ marginRight: 3, verticalAlign: "middle" }} />Course Mentor</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LearnerCourseDetails;

/* ─── Styles ─────────────────────────────────────────────── */

const styles = {
  page: {
    background: "#F8FAFC",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  /* Loading */
  loadingScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "16px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #E5E7EB",
    borderTop: "3px solid #1D4ED8",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    color: "#6B7280",
    fontSize: "15px",
  },

  /* Hero */
  heroWrapper: {
    position: "relative",
    width: "100%",
    height: "380px",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)",
  },
  heroContent: {
    position: "absolute",
    bottom: "36px",
    left: "40px",
    right: "40px",
  },
  levelBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.04em",
    marginBottom: "12px",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "1.25",
    margin: "0 0 16px",
    maxWidth: "720px",
    textShadow: "0 1px 4px rgba(0,0,0,0.3)",
  },
  heroMeta: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  metaChip: {
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: "500",
    padding: "6px 14px",
    borderRadius: "8px",
  },

  /* Body Layout */
  body: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "28px",
    padding: "32px 40px 60px",
    maxWidth: "1240px",
    margin: "0 auto",
    alignItems: "start",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  /* Card */
  card: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "28px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 16px",
  },
  cardBody: {
    fontSize: "15px",
    color: "#374151",
    lineHeight: "1.8",
    margin: 0,
  },

  /* Stats */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  statCard: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    textAlign: "center",
  },
  statIcon: {
    fontSize: "24px",
  },
  statValue: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#111827",
  },
  statLabel: {
    fontSize: "12px",
    color: "#9CA3AF",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  /* Curriculum */
  curriculumMeta: {
    fontSize: "13px",
    color: "#6B7280",
    margin: "-8px 0 20px",
    fontWeight: "500",
  },
  sessionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #F3F4F6",
  },
  sessionLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  sessionIndex: {
    width: "32px",
    height: "32px",
    background: "#EFF6FF",
    color: "#1D4ED8",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "700",
    flexShrink: 0,
  },
  sessionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 3px",
  },
  sessionDuration: {
    fontSize: "12px",
    color: "#6B7280",
    margin: 0,
  },
  viewBtn: {
    background: "transparent",
    border: "1px solid #D1D5DB",
    color: "#374151",
    padding: "7px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.15s",
  },

  /* Sidebar */
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "sticky",
    top: "24px",
  },

  /* Enroll Card */
  enrollCard: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },
  enrollThumb: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    display: "block",
  },
  enrollBody: {
    padding: "20px",
  },
  enrollCourseTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 10px",
    lineHeight: "1.4",
  },
  enrollMeta: {
    display: "flex",
    gap: "12px",
    fontSize: "13px",
    color: "#6B7280",
    marginBottom: "18px",
  },
  enrollBtn: {
    width: "100%",
    background: "#1D4ED8",
    color: "#FFFFFF",
    border: "none",
    padding: "13px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.15s",
    marginBottom: "10px",
  },
  enrolledBtn: {
    background: "#15803D",
    cursor: "default",
  },
  enrollingBtn: {
    background: "#93C5FD",
    cursor: "wait",
  },
  startBtn: {
    width: "100%",
    background: "transparent",
    color: "#1D4ED8",
    border: "1.5px solid #1D4ED8",
    padding: "11px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  /* Mentor */
  mentorRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  mentorAvatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#EFF6FF",
    color: "#1D4ED8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "700",
    flexShrink: 0,
  },
  mentorName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 2px",
  },
  mentorRole: {
    fontSize: "12px",
    color: "#6B7280",
    margin: 0,
  },
};