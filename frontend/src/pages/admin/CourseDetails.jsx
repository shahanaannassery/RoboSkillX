import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  FaPlus,
  FaVideo,
  FaFilePdf,
  FaProjectDiagram,
  FaUser,
  FaClock,
} from "react-icons/fa";

function CourseDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  const [sessions, setSessions] = useState([]);

  // FETCH COURSE
  const fetchCourse = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8000/api/admin/courses/${id}/`
      );

      setCourse(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH SESSIONS
  const fetchSessions = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8000/api/admin/courses/${id}/sessions/`
      );

      setSessions(res.data);

    } catch (error) {

      console.log(error);

    }
  };

useEffect(() => {

  const loadData = async () => {

    await fetchCourse();

    await fetchSessions();

  };

  loadData();

// eslint-disable-next-line
}, [id]);

  if (!course) {

    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }


 

  return (
    <div style={styles.wrapper}>

      {/* PAGE HEADER */}
<div style={styles.pageHeader}>

  <div>

    <h1 style={styles.pageTitle}>
      Course Details
    </h1>

    <p style={styles.pageSubtitle}>
      View course information, mentors and sessions
    </p>

  </div>

  <button
    style={styles.backBtn}
    onClick={() =>
      navigate("/admin/courses")
    }
  >
    ← Back to Courses
  </button>

</div>

      {/* COURSE INFO */}
      <div style={styles.courseCard}>

        <div style={styles.courseTop}>

          {/* LEFT */}
          <div style={styles.courseLeft}>

            <img
              src={
                course.thumbnail
                  ? `http://localhost:8000${course.thumbnail}`
                  : "https://via.placeholder.com/250x160"
              }
              alt="course"
              style={styles.thumbnail}
            />

          </div>

          {/* RIGHT */}
          <div style={styles.courseRight}>

            <div style={styles.levelBadge}>
              {course.level}
            </div>

            <h1 style={styles.title}>
              {course.title}
            </h1>

            <p style={styles.description}>
              {course.description}
            </p>

            <div style={styles.infoGrid}>

              <div style={styles.infoCard}>

                <FaClock style={{ color: "#4f46e5" }} />

                <span>
                  {course.duration}
                </span>

              </div>

              <div style={styles.infoCard}>

                <FaVideo style={{ color: "#7c3aed" }} />

                <span>
                  {course.total_sessions} Sessions
                </span>

              </div>

              <div style={styles.infoCard}>
                <strong style={{ color: "#4f46e5" }}>Price:</strong>
                <span style={{ fontWeight: "600" }}>₹{course.price}</span>
              </div>

              <div style={styles.infoCard}>
                <strong style={{ color: "#d97706" }}>Status:</strong>
                <span style={{ fontWeight: "600" }}>{course.status}</span>
              </div>

              <div style={styles.infoCard}>
                <span style={{ color: "#666", fontSize: "12px" }}>
                  Created: {new Date(course.created_at).toLocaleDateString()}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MENTOR */}
{/* ASSIGNED MENTORS */}
<div style={styles.mentorSection}>

  <h2 style={styles.mentorTitle}>
    Assigned Mentors
  </h2>

  <div style={styles.mentorGrid}>

    {course.mentor_names?.length > 0 ? (

      course.mentor_names.map((mentor) => (

        <div
          key={mentor.id}
          style={styles.mentorProfileBadge}
        >

          <div style={styles.mentorAvatar}>
            {mentor.name.charAt(0).toUpperCase()}
          </div>

          <div style={{ flex: 1 }}>

            <h3 style={styles.mentorName}>
              {mentor.name}
            </h3>

            <p style={styles.mentorEmail}>
              {mentor.email}
            </p>

          </div>

          <button
            style={styles.viewBtn}
            onClick={() =>
              navigate(
                `/admin/mentor-details/${mentor.id}`
              )
            }
          >
            View Details
          </button>

        </div>

      ))

    ) : (

      <p style={{ color: "#6B7280" }}>
        No mentors assigned
      </p>

    )}

  </div>

</div>
      {/* SESSION HEADER */}
      <div style={styles.sessionHeader}>

        <div>

          <h2 style={styles.sessionTitle}>
            Course Sessions
          </h2>

          <p style={styles.sessionSubtitle}>
            Manage course sessions,
            videos, projects and quizzes.
          </p>

        </div>

       <button
  style={styles.addBtn}
  onClick={() =>
    navigate(
      `/admin/course/${id}/create-session`
    )
  }
>

  <FaPlus />

  Add Session

</button>

      </div>

      {/* SESSION LIST */}
      <div style={styles.sessionList}>

        {sessions.length === 0 ? (

          <div style={styles.emptyCard}>

            <h3>
              No Sessions Added
            </h3>

            <p>
              Start by adding your first
              learning session.
            </p>

          </div>

        ) : (

          sessions.map((session, index) => (

            <div
              key={session.id || index}
              style={styles.sessionCard}
            >

              {/* TOP */}
              <div style={styles.sessionTop}>

  <div>

    <div style={styles.sessionNumber}>
      Session {index + 1}
    </div>

    <h3 style={styles.sessionName}>
      {session.title}
    </h3>

  </div>

  <div style={styles.topRight}>

    <div style={styles.durationBadge}>
      {session.duration}
    </div>

    <button
      style={styles.viewBtnSmall}
      onClick={() =>
        navigate(`/admin/session/${session.id}`)
      }
    >
      View
    </button>

  </div>

</div>

              {/* DESCRIPTION */}
              <p style={styles.sessionDesc}>
                {session.description}
              </p>

              {/* TAGS */}
              <div style={styles.tags}>

                {session.video && (

                  <div style={styles.tag}>

                    <FaVideo />

                    Video

                  </div>
                  

                )}


                {session.materials && (

                  <div style={styles.tag}>

                    <FaFilePdf />

                    Notes

                  </div>

                )}


                {session.project_title && (

                  <div style={styles.tag}>

                    <FaProjectDiagram />

                    Project

                  </div>

                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default CourseDetails;

/* ===================== STYLES ===================== */

const styles = {

  wrapper: {
    padding: "25px",
    background: "#C1D1CF",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  loading: {
    padding: "40px",
    fontSize: "18px",
  },

  courseCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "25px",
    border: "1px solid #dcdcdc",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },

  courseTop: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
  },

  courseLeft: {
    flex: "0 0 250px",
  },

  thumbnail: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  courseRight: {
    flex: 1,
  },

  levelBadge: {
    display: "inline-block",
    padding: "6px 14px",
    background: "#E7F5EC",
    color: "#1A7F4B",
    borderRadius: "30px",
    fontSize: "13px",
    marginBottom: "12px",
    fontWeight: "600",
  },

  title: {
    fontSize: "32px",
    marginBottom: "15px",
    color: "#171F22",
    fontWeight: "700",
  },

  description: {
    color: "#555",
    lineHeight: "1.7",
    marginBottom: "20px",
    fontSize: "15px",
  },

  infoGrid: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  infoCard: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#F5F7F8",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#333",
    border: "1px solid #eaeaea",
  },

  // mentorCard: {
  //   background: "#fff",
  //   borderRadius: "12px",
  //   padding: "25px",
  //   marginBottom: "25px",
  //   border: "1px solid #ddd",
  //   boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  // },

  // mentorTitle: {
  //   fontSize: "20px",
  //   marginBottom: "18px",
  //   color: "#171F22",
  //   fontWeight: "700",
  // },

  // mentorGrid: {
  //   display: "grid",
  //   gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  //   gap: "15px",
  // },

  // mentorProfileBadge: {
  //   display: "flex",
  //   alignItems: "center",
  //   gap: "12px",
  //   background: "#F8FAFC",
  //   padding: "12px 16px",
  //   borderRadius: "10px",
  //   border: "1px solid #e2e8f0",
  // },

  // mentorAvatar: {
  //   width: "40px",
  //   height: "40px",
  //   borderRadius: "50%",
  //   background: "#6366f1",
  //   color: "#fff",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   fontWeight: "600",
  //   fontSize: "16px",
  // },

  // mentorName: {
  //   fontSize: "15px",
  //   fontWeight: "600",
  //   color: "#1e293b",
  //   margin: 0,
  //   textTransform: "capitalize",
  // },

  // mentorEmail: {
  //   fontSize: "13px",
  //   color: "#64748b",
  //   margin: "2px 0 0 0",
  // },

  sessionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },

  sessionTitle: {
    fontSize: "28px",
    color: "#171F22",
    marginBottom: "5px",
    fontWeight: "700",
  },

  sessionSubtitle: {
    color: "#666",
    fontSize: "14px",
  },

  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background 0.2s",
  },

  sessionList: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  emptyCard: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  },

  sessionCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "22px",
    border: "1px solid #ddd",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },

  sessionTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    flexWrap: "wrap",
    gap: "10px",
  },

  sessionNumber: {
    color: "#6366f1",
    fontSize: "13px",
    marginBottom: "4px",
    fontWeight: "600",
  },

  sessionName: {
    fontSize: "22px",
    color: "#171F22",
    fontWeight: "700",
  },

  durationBadge: {
    background: "#EEF2FF",
    color: "#3B5BDB",
    padding: "8px 14px",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "600",
  },

  sessionDesc: {
    color: "#555",
    lineHeight: "1.7",
    marginBottom: "18px",
    fontSize: "14px",
  },

  tags: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  tag: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#F5F5F5",
    padding: "8px 14px",
    borderRadius: "30px",
    fontSize: "13px",
    color: "#333",
    border: "1px solid #e5e5e5",
  },
 mentorSection: {
  marginBottom: "25px",
},

mentorTitle: {
  fontSize: "20px",
  fontWeight: "700",
  color: "#171F22",
  marginBottom: "15px",
},

mentorGrid: {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
},

mentorProfileBadge: {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "#F5F5F5",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  padding: "12px 16px",
  minWidth: "260px",
},

mentorAvatar: {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "#D1D5DB",
  color: "#374151",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  fontSize: "16px",
},

mentorName: {
  margin: 0,
  fontSize: "15px",
  fontWeight: "600",
  color: "#171F22",
},

mentorEmail: {
  margin: "3px 0 0 0",
  fontSize: "13px",
  color: "#6B7280",
},
viewBtn: {
  background: "#666B64",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
},
pageHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  flexWrap: "wrap",
  gap: "15px",
},

pageTitle: {
  fontSize: "32px",
  fontWeight: "700",
  color: "#171F22",
  margin: 0,
},

pageSubtitle: {
  marginTop: "6px",
  color: "#6B7280",
  fontSize: "14px",
},

backBtn: {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  color: "#171F22",
},

topRight: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
},

viewBtnSmall: {
  background: "#666B64",
  color: "#FFFFFF",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
},
};