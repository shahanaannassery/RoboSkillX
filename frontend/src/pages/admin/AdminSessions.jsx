import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminSessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");

  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/all-sessions/");
      // console.log("COURSE TITLE =", res.data[0].course_title);
      setSessions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this session?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `http://localhost:8000/api/admin/sessions/${id}/delete/`
    );

    setSessions(
      sessions.filter(
        (session) => session.id !== id
      )
    );

  } catch (error) {

    console.log(error);
    alert("Failed to delete session");

  }
};

  return (
    <div style={styles.wrapper}>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.heading}>Sessions</h1>
          <p style={styles.subHeading}>Manage all robotics learning sessions</p>
        </div>

        <div style={styles.searchBox}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search sessions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* TABLE CARD */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Session</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}>Video</th>
              <th style={styles.th}>Project</th>
              <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan={6} style={styles.emptyRow}>
                  No sessions found.
                </td>
              </tr>
            ) : (
              filteredSessions.map((session) => (
                <tr key={session.id} style={styles.tr}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f7f9f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {/* SESSION */}
                  <td style={styles.td}>
                    <p style={styles.sessionTitle}>{session.title}</p>
                    <p style={styles.description}>{session.description}</p>
                  </td>

                  {/* COURSE */}
                  <td style={styles.td}>
                    <span style={styles.courseChip}>{session.course_title}</span>
                  </td>

                  {/* DURATION */}
                  <td style={styles.td}>
                    <span style={styles.durationText}>{session.duration}</span>
                  </td>

                  {/* VIDEO */}
                  <td style={styles.td}>
                    <span style={session.video ? styles.badgeYes : styles.badgeNo}>
                      {session.video ? "Yes" : "No"}
                    </span>
                  </td>

                  {/* PROJECT */}
                  <td style={styles.td}>
                    <span style={session.project_title ? styles.badgeYes : styles.badgeNo}>
                      {session.project_title ? "Yes" : "No"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <div style={styles.actionButtons}>
                      <button
                        title="View"
                        style={styles.viewBtn}
                        onClick={() => navigate(`/admin/session/${session.id}`)}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#2d3e42")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#171F22")}
                      >
                        <FaEye size={14} />
                      </button>

                      <button
  title="Edit"
  style={styles.editBtn}
  onClick={() =>
    navigate(`/admin/edit-session/${session.id}`)
  }
  onMouseEnter={(e) =>
    (e.currentTarget.style.background = "#4a7a72")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.background = "#5b9e94")
  }
>
  <FaEdit size={14} />
</button>

                     <button
  title="Delete"
  style={styles.deleteBtn}
  onClick={() => handleDelete(session.id)}
  onMouseEnter={(e) =>
    (e.currentTarget.style.background = "#922020")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.background = "#b52a2a")
  }
>
  <FaTrash size={14} />
</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER COUNT */}
      {filteredSessions.length > 0 && (
        <p style={styles.footerCount}>
          Showing {filteredSessions.length} session{filteredSessions.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

export default AdminSessions;

/* ===== STYLES ===== */

const styles = {
  wrapper: {
    padding: "36px 32px",
    background: "#C1D1CF",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "16px",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#171F22",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },

  subHeading: {
    color: "#4a5e62",
    fontSize: "14px",
    margin: 0,
  },

  searchBox: {
    background: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    borderRadius: "10px",
    width: "280px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },

  searchIcon: {
    color: "#8fa8a6",
    marginRight: "10px",
    flexShrink: 0,
  },

  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    background: "transparent",
    color: "#171F22",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(23,31,34,0.08)",
    border: "1px solid #d0dedd",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px 20px",
    background: "#eef3f2",
    color: "#3a5055",
    fontWeight: "600",
    fontSize: "13px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    borderBottom: "1px solid #d8e4e2",
  },

  tr: {
    borderBottom: "1px solid #eef1f1",
    transition: "background 0.15s ease",
    cursor: "default",
  },

  td: {
    padding: "16px 20px",
    verticalAlign: "middle",
    color: "#171F22",
    fontSize: "14px",
  },

  sessionTitle: {
    margin: "0 0 4px 0",
    fontWeight: "600",
    fontSize: "15px",
    color: "#171F22",
  },

  description: {
    margin: 0,
    color: "#6b8a8e",
    fontSize: "13px",
    lineHeight: "1.5",
    maxWidth: "280px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  courseChip: {
    display: "inline-block",
    background: "#e0ecea",
    color: "#2e5a60",
    borderRadius: "6px",
    padding: "4px 10px",
    fontSize: "13px",
    fontWeight: "500",
  },

  durationText: {
    color: "#4a6a6e",
    fontWeight: "500",
  },

  badgeYes: {
    display: "inline-block",
    background: "#d4ede8",
    color: "#1e6b56",
    borderRadius: "20px",
    padding: "3px 12px",
    fontSize: "12px",
    fontWeight: "600",
  },

  badgeNo: {
    display: "inline-block",
    background: "#f0e8e8",
    color: "#8a3030",
    borderRadius: "20px",
    padding: "3px 12px",
    fontSize: "12px",
    fontWeight: "600",
  },

  actionButtons: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },

  viewBtn: {
    width: "34px",
    height: "34px",
    border: "none",
    borderRadius: "8px",
    background: "#171F22",
    color: "#C1D1CF",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },

  editBtn: {
    width: "34px",
    height: "34px",
    border: "none",
    borderRadius: "8px",
    background: "#5b9e94",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },

  deleteBtn: {
    width: "34px",
    height: "34px",
    border: "none",
    borderRadius: "8px",
    background: "#b52a2a",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },

  emptyRow: {
    textAlign: "center",
    padding: "40px",
    color: "#8fa8a6",
    fontSize: "15px",
  },

  footerCount: {
    marginTop: "14px",
    color: "#4a6a6e",
    fontSize: "13px",
    textAlign: "right",
  },
};