import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FiBookOpen, FiSearch, FiFilter, FiZap, FiClock,
  FiChevronRight, FiCheckCircle, FiLock, FiStar,
  FiUser, FiBook, FiPlay,
} from "react-icons/fi";

const API = "http://localhost:8000";

const TABS = ["All", "Enrolled", "Completed", "Not Started"];

function LearnerCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [enrollingId, setEnrollingId] = useState(null);

  // ── Fetch courses ──────────────────────────────────────────────────────────
  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await fetch(
        `${API}/api/learners/courses/`,
        {
          credentials: "include", // send cookies
        }
      );

      if (!res.ok) {
        throw new Error("Failed to load courses");
      }

      const data = await res.json();
      setCourses(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);

  // ── Enroll ─────────────────────────────────────────────────────────────────
  const handleEnroll = async (e, courseId) => {
  e.stopPropagation();

  setEnrollingId(courseId);

  try {
    const res = await fetch(
      `${API}/api/learners/courses/${courseId}/enroll/`,
      {
        method: "POST",
        credentials: "include", // send cookies
      }
    );

    if (!res.ok) {
      throw new Error("Enrollment failed");
    }

    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? { ...c, is_enrolled: true, progress: 0 }
          : c
      )
    );

    navigate(`/learner/courses/${courseId}`);

  } catch (err) {
    alert(err.message);
  } finally {
    setEnrollingId(null);
  }
};
  // ── Filter logic ───────────────────────────────────────────────────────────
  const filtered = courses.filter((c) => {
    const matchSearch =
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase());

    const matchTab =
      activeTab === "All" ||
      (activeTab === "Enrolled" && c.is_enrolled && c.progress < 100) ||
      (activeTab === "Completed" && c.progress >= 100) ||
      (activeTab === "Not Started" && !c.is_enrolled);

    return matchSearch && matchTab;
  });

  // ── Helpers ────────────────────────────────────────────────────────────────
  const levelColor = (level = "") => {
    const l = level.toLowerCase();
    if (l.includes("beginner")) return { bg: "#e6f4ea", text: "#2e7d32" };
    if (l.includes("inter")) return { bg: "#fff3e0", text: "#e65100" };
    if (l.includes("adv")) return { bg: "#f3e5f5", text: "#6a1b9a" };
    return { bg: "#e8f4f8", text: "#26658C" };
  };

  const courseStatus = (course) => {
    if (course.progress >= 100) return "completed";
    if (course.is_enrolled) return "enrolled";
    return "new";
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <DashboardLayout>
        <div style={s.loadingWrap}>
          <div style={s.spinnerRing} />
          <p style={s.loadingText}>Loading courses...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={s.wrapper}>

        {/* ── PAGE HEADER ── */}
        <div style={s.pageHeader}>
          <div>
            <h2 style={s.pageTitle}>Courses</h2>
            <p style={s.pageSubtitle}>
              {courses.length} course{courses.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <button style={s.backBtn} onClick={() => navigate("/dashboard")}>
            Dashboard <FiChevronRight size={14} />
          </button>
        </div>

        {/* ── SEARCH + FILTER BAR ── */}
        <div style={s.searchBar}>
          <div style={s.searchWrap}>
            <FiSearch size={16} color="#8aaabb" style={s.searchIcon} />
            <input
              style={s.searchInput}
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={s.tabsRow}>
            {TABS.map((tab) => (
              <button
                key={tab}
                style={{
                  ...s.tabBtn,
                  ...(activeTab === tab ? s.tabBtnActive : {}),
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                <span style={{
                  ...s.tabCount,
                  ...(activeTab === tab ? s.tabCountActive : {}),
                }}>
                  {tab === "All" ? courses.length
                    : tab === "Enrolled" ? courses.filter(c => c.is_enrolled && c.progress < 100).length
                    : tab === "Completed" ? courses.filter(c => c.progress >= 100).length
                    : courses.filter(c => !c.is_enrolled).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && <div style={s.errorBox}>{error}</div>}

        {/* ── EMPTY STATE ── */}
        {!error && filtered.length === 0 && (
          <div style={s.emptyBox}>
            <FiBook size={40} color="#b0cdd8" style={{ marginBottom: 12 }} />
            <p style={s.emptyTitle}>No courses found</p>
            <p style={s.emptyDesc}>
              {search ? `No results for "${search}"` : "No courses in this category yet."}
            </p>
            {search && (
              <button style={s.clearBtn} onClick={() => setSearch("")}>
                Clear search
              </button>
            )}
          </div>
        )}

        {/* ── COURSE GRID ── */}
        {filtered.length > 0 && (
          <div style={s.grid}>
            {filtered.map((course) => {
              const status = courseStatus(course);
              const lc = levelColor(course.level || course.skill_level);
              const isEnrolling = enrollingId === course.id;

              return (
                <div
                  key={course.id}
                  style={s.card}
                  onClick={() => navigate(`/learner/courses/${course.id}`)}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(38,101,140,0.14)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = s.card.boxShadow}
                >
                  {/* Thumbnail */}
                  {course.thumbnail ? (
                    <img
  src={course.thumbnail}
  alt={course.title}
  style={s.cardImg}
/>
                  ) : (
                    <div style={s.cardImgPlaceholder}>
                      <FiZap size={36} color="#fff" />
                      {status === "completed" && (
                        <div style={s.completedOverlay}>
                          <FiCheckCircle size={28} color="#fff" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status badge */}
                  <div style={s.statusBadgeWrap}>
                    {status === "completed" && (
                      <span style={{ ...s.statusBadge, background: "#e6f4ea", color: "#2e7d32" }}>
                        <FiCheckCircle size={11} /> Completed
                      </span>
                    )}
                    {status === "enrolled" && (
                      <span style={{ ...s.statusBadge, background: "#e8f4f8", color: "#26658C" }}>
                        <FiPlay size={11} /> In Progress
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div style={s.cardBody}>
                    <h4 style={s.cardTitle}>{course.title}</h4>
                    <p style={s.cardDesc}>{course.description}</p>

                    {/* Meta row */}
                    <div style={s.metaRow}>
                      {(course.level || course.skill_level) && (
                        <span style={{
                          ...s.levelBadge,
                          background: lc.bg, color: lc.text
                        }}>
                          {course.level || course.skill_level}
                        </span>
                      )}
                      {course.lesson_count > 0 && (
                        <span style={s.metaChip}>
                          <FiBookOpen size={11} /> {course.lesson_count} lessons
                        </span>
                      )}
                      {course.mentor_name && (
                        <span style={s.metaChip}>
                          <FiUser size={11} /> {course.mentor_name}
                        </span>
                      )}
                    </div>

                    {/* Progress bar (enrolled) */}
                    {course.is_enrolled && (
                      <div style={s.progressWrap}>
                        <div style={s.progressBar}>
                          <div
                            style={{
                              ...s.progressFill,
                              width: `${Math.min(course.progress ?? 0, 100)}%`,
                              background: course.progress >= 100 ? "#2e7d32" : "#26658C",
                            }}
                          />
                        </div>
                        <span style={s.progressLabel}>{course.progress ?? 0}%</span>
                      </div>
                    )}

                    {/* Action button */}
                    <button
                      style={{
                        ...s.actionBtn,
                        ...(status === "completed" ? s.actionBtnDone : {}),
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (status === "new") {
                          handleEnroll(e, course.id);
                        } else {
                          navigate(`/learner/courses/${course.id}`);
                        }
                      }}
                      onMouseEnter={e => {
                        if (status !== "completed")
                          e.currentTarget.style.background = "#1a4f6e";
                      }}
                      onMouseLeave={e => {
                        if (status === "completed")
                          e.currentTarget.style.background = "#e6f4ea";
                        else
                          e.currentTarget.style.background = "#26658C";
                      }}
                      disabled={isEnrolling}
                    >
                      {isEnrolling ? "Enrolling..." :
                        status === "completed" ? "Review Course" :
                        status === "enrolled" ? "Continue Learning" :
                        "Enroll Now"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default LearnerCourses;

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
    animation: "spin 0.7s linear infinite",
  },
  loadingText: { color: "#26658C", fontSize: "14px", fontWeight: "500" },

  // Header
  pageHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", marginBottom: "20px",
  },
  pageTitle: {
    fontSize: "24px", fontWeight: "700",
    color: "#1a3a4a", margin: "0 0 4px 0",
  },
  pageSubtitle: { fontSize: "14px", color: "#4a6a7a", margin: 0 },
  backBtn: {
    display: "flex", alignItems: "center", gap: "4px",
    background: "#fff", border: "1px solid #d6eaee",
    borderRadius: "10px", padding: "8px 14px",
    color: "#26658C", fontWeight: "600", fontSize: "13px",
    cursor: "pointer",
  },

  // Search + tabs
  searchBar: {
    background: "#fff",
    borderRadius: "16px",
    padding: "16px 20px",
    marginBottom: "20px",
    border: "1px solid #d6eaee",
    boxShadow: "0 2px 8px rgba(38,101,140,0.06)",
    display: "flex", flexDirection: "column", gap: "14px",
  },
  searchWrap: {
    display: "flex", alignItems: "center",
    gap: "10px", position: "relative",
  },
  searchIcon: { position: "absolute", left: "12px" },
  searchInput: {
    width: "100%",
    padding: "10px 12px 10px 36px",
    border: "1px solid #d6eaee",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#1a3a4a",
    outline: "none",
    background: "#f8fbfc",
  },
  tabsRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  tabBtn: {
    display: "flex", alignItems: "center", gap: "6px",
    padding: "7px 14px",
    background: "transparent",
    border: "1px solid #d6eaee",
    borderRadius: "99px",
    fontSize: "13px", fontWeight: "500",
    color: "#4a6a7a", cursor: "pointer",
    transition: "all 0.15s",
  },
  tabBtnActive: {
    background: "#26658C",
    borderColor: "#26658C",
    color: "#fff",
  },
  tabCount: {
    background: "#e8f4f8",
    color: "#26658C",
    fontSize: "11px", fontWeight: "700",
    padding: "1px 7px", borderRadius: "99px",
  },
  tabCountActive: { background: "rgba(255,255,255,0.25)", color: "#fff" },

  // Error / empty
  errorBox: {
    background: "#fff5f5", border: "1px solid #fed7d7",
    borderRadius: "12px", padding: "16px 20px",
    color: "#c53030", fontSize: "14px", marginBottom: "16px",
  },
  emptyBox: {
    background: "#fff",
    borderRadius: "16px",
    padding: "60px 32px",
    textAlign: "center",
    border: "1px solid #d6eaee",
    boxShadow: "0 2px 8px rgba(38,101,140,0.06)",
    display: "flex", flexDirection: "column", alignItems: "center",
  },
  emptyTitle: { fontSize: "17px", fontWeight: "700", color: "#1a3a4a", margin: "0 0 6px" },
  emptyDesc: { fontSize: "14px", color: "#8aaabb", margin: 0 },
  clearBtn: {
    marginTop: "14px",
    background: "#26658C", color: "#fff",
    border: "none", borderRadius: "10px",
    padding: "9px 20px", fontSize: "13px",
    fontWeight: "600", cursor: "pointer",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
  },

  // Card
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #d6eaee",
    boxShadow: "0 2px 10px rgba(38,101,140,0.07)",
    display: "flex", flexDirection: "column",
    cursor: "pointer",
    transition: "box-shadow 0.2s, transform 0.15s",
    position: "relative",
  },
  cardImg: { width: "100%", height: "168px", objectFit: "cover", display: "block" },
  cardImgPlaceholder: {
    width: "100%", height: "168px",
    background: "linear-gradient(135deg, #26658C, #1a3a4a)",
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative",
  },
  completedOverlay: {
    position: "absolute", inset: 0,
    background: "rgba(46,125,50,0.55)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },

  // Status badge on thumbnail
  statusBadgeWrap: {
    position: "absolute", top: "12px", right: "12px",
  },
  statusBadge: {
    display: "inline-flex", alignItems: "center", gap: "4px",
    fontSize: "11px", fontWeight: "700",
    padding: "4px 10px", borderRadius: "99px",
  },

  cardBody: {
    padding: "16px", flex: 1,
    display: "flex", flexDirection: "column", gap: "8px",
  },
  cardTitle: {
    fontSize: "15px", fontWeight: "700",
    color: "#1a3a4a", margin: 0, lineHeight: "1.35",
  },
  cardDesc: {
    fontSize: "13px", color: "#6a8a9a",
    lineHeight: "1.5", margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  metaRow: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" },
  levelBadge: {
    fontSize: "11px", fontWeight: "700",
    padding: "3px 10px", borderRadius: "20px",
  },
  metaChip: {
    display: "flex", alignItems: "center", gap: "3px",
    fontSize: "12px", color: "#6a8a9a",
  },

  // Progress
  progressWrap: {
    display: "flex", alignItems: "center", gap: "8px",
  },
  progressBar: {
    flex: 1, height: "6px",
    background: "#e8f0f4", borderRadius: "4px", overflow: "hidden",
  },
  progressFill: {
    height: "100%", borderRadius: "4px",
    transition: "width 0.5s ease",
  },
  progressLabel: {
    fontSize: "11px", fontWeight: "700",
    color: "#26658C", minWidth: "30px", textAlign: "right",
  },

  // Action button
  actionBtn: {
    width: "100%", marginTop: "auto",
    padding: "11px",
    background: "#26658C", color: "#fff",
    border: "none", borderRadius: "10px",
    fontWeight: "600", fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  actionBtnDone: {
    background: "#e6f4ea", color: "#2e7d32",
  },
};