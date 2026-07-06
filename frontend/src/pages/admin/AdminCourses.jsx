import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaPlus,
  FaSearch,
  FaUsers,
  FaEdit,
FaTrash,
FaEye,
} from "react-icons/fa";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchCourses = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8000/api/admin/courses/"
    );

    setCourses(res.data);

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {

  const loadCourses = async () => {
    await fetchCourses();
  };

  loadCourses();

}, []);

  

  const filteredCourses = courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  // console.log("COURSES =", courses);
  // console.log("FILTERED =", filteredCourses);

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `http://localhost:8000/api/admin/courses/${id}/delete/`
    );

    setCourses(
      courses.filter(
        (course) => course.id !== id
      )
    );

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div style={styles.wrapper}>

      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>

          <div>
            <h1 style={styles.title}>
              Courses
            </h1>

            <p style={styles.subtitle}>
              Create and manage robotics courses.
            </p>
          </div>

          <button
  style={styles.createBtn}
  onClick={() =>
    navigate("/admin/create-course")
  }
>
  <FaPlus />
  Create Course
</button>
        </div>

        {/* TOP CARDS */}
        <div style={styles.statsGrid}>

          {/* TOTAL COURSES */}
          <div style={styles.card}>

            <p style={styles.cardTitle}>
              Total Courses
            </p>

            <h2 style={styles.cardValue}>
              {courses.length}
            </h2>

            <p style={styles.cardSub}>
              Robotics learning programs
            </p>

          </div>

          {/* ENROLLMENTS */}
          <div style={styles.card}>

            <p style={styles.cardTitle}>
              Total Enrollments
            </p>

            <h2 style={styles.cardValue}>
              {courses.reduce(
                (total, course) =>
                  total + (course.learners || 0),
                0
              )}
            </h2>

            <p style={styles.cardSub}>
              Registered learners
            </p>

          </div>

          {/* MENTORS */}
          <div style={styles.card}>

            <p style={styles.cardTitle}>
              Mentors Assigned
            </p>

    <h2 style={styles.cardValue}>
  {
    courses.reduce(
      (total, course) =>
        total + (course.mentor_names?.length || 0),
      0
    )
  }
</h2>

            <p style={styles.cardSub}>
              Assigned mentors
            </p>

          </div>

        </div>

        {/* TABLE SECTION */}
        <div style={styles.tableCard}>

          {/* TABLE TOP */}
          <div style={styles.tableHeader}>

            <div>
              <h2 style={styles.tableTitle}>
                Course List
              </h2>

              <p style={styles.tableSub}>
                Manage all robotics courses.
              </p>
            </div>

            {/* SEARCH */}
            <div style={styles.searchBox}>

              <FaSearch style={styles.searchIcon} />

              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                style={styles.searchInput}
              />

            </div>

          </div>

          {/* RESPONSIVE TABLE */}
          <div style={styles.tableWrapper}>

            <table style={styles.table}>

              <thead style={styles.thead}>
                <tr>

                  <th style={styles.th}>
                    Course Title
                  </th>

                  <th style={styles.th}>
                    Level
                  </th>

                  <th style={styles.th}>
                    Mentor
                  </th>

                  <th style={styles.th}>
                    Learners
                  </th>

                  <th style={styles.th}>
                    Created Date
                  </th>

                  <th style={styles.th}>
                    Status
                  </th>

                  <th style={styles.th}>
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr
                      key={course.id}
                      style={styles.tr}
                    >

                      {/* TITLE */}
                      <td style={styles.td}>

                        <div>
                          <strong style={styles.courseTitle}>
                            {course.title}
                          </strong>
                        </div>

                      </td>

                      {/* LEVEL */}
                      <td style={styles.td}>

  <span
    style={{
      ...styles.levelBadge,

      background:
        course.level === "Beginner"
          ? "#DCFCE7"
          : course.level === "Intermediate"
          ? "#FEF3C7"
          : "#FEE2E2",

      color:
        course.level === "Beginner"
          ? "#166534"
          : course.level === "Intermediate"
          ? "#92400E"
          : "#B91C1C",
    }}
  >
    {course.level}
  </span>

</td>

                      {/* MENTOR */}
<td style={styles.td}>

  <span style={styles.mentorBadge}>
    {course.mentor_names?.length || 0} Mentors
  </span>

</td>

                      {/* LEARNERS */}
                      <td style={styles.td}>

                        <div style={styles.userCell}>
                          <FaUsers size={12} />
                          {course.learners || 0}
                        </div>

                      </td>

                      {/* DATE */}
                      <td style={styles.td}>
  {new Date(course.created_at).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )}
</td>

                      {/* STATUS */}
                      <td style={styles.td}>

                        <span
                          style={
                            course.status === "Active"
                              ? styles.active
                              : styles.inactive
                          }
                        >
                          {course.status}
                        </span>

                      </td>
{/* ACTIONS */}
<td style={styles.td}>

  <div style={styles.actionBtns}>

    <button
      style={styles.viewBtn}
      onClick={() =>
        navigate(`/admin/course/${course.id}`)
      }
    >
      <FaEye />
    </button>

    <button
  style={styles.editBtn}
  onClick={() =>
    navigate(`/admin/edit-course/${course.id}`)
  }
>
  <FaEdit />
</button>

    <button
  style={styles.deleteBtn}
  onClick={() => handleDelete(course.id)}
>
  <FaTrash />
</button>

  </div>

</td>

</tr>
                  ))
                ) : (
                  <tr>

                    <td
                      colSpan="7"
                      style={styles.empty}
                    >
                      No courses added yet
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminCourses;

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    background: "#C1D1CF",
    minHeight: "100vh",
    padding: "20px",
  },

  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "25px",
  },

  title: {
    fontSize: "34px",
    color: "#171F22",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#555",
    fontSize: "14px",
  },

  createBtn: {
    background: "#666B64",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #636467",
    borderRadius: "8px",
    padding: "20px",
  },

  cardTitle: {
    color: "#555",
    fontSize: "14px",
  },

  cardValue: {
    fontSize: "30px",
    margin: "10px 0",
    color: "#171F22",
  },

  cardSub: {
    color: "#777",
    fontSize: "13px",
  },

  tableCard: {
    background: "#FFFFFF",
    border: "1px solid #636467",
    borderRadius: "8px",
    overflow: "hidden",
  },

  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    padding: "18px",
    borderBottom: "1px solid #ddd",
  },

  tableTitle: {
    fontSize: "24px",
    marginBottom: "5px",
    color: "#171F22",
  },

  tableSub: {
    color: "#666",
    fontSize: "13px",
  },

  searchBox: {
    position: "relative",
  },

  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "12px",
    color: "#777",
    fontSize: "13px",
  },

  searchInput: {
    padding: "10px 14px 10px 34px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "220px",
    fontSize: "13px",
    outline: "none",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    minWidth: "850px",
    borderCollapse: "collapse",
  },

  thead: {
    background: "#F5F5F5",
  },

  th: {
    padding: "14px 12px",
    textAlign: "left",
    fontSize: "13px",
    color: "#555",
    fontWeight: "600",
  },

  tr: {
    borderBottom: "1px solid #E0E0E0",
  },

  td: {
    padding: "14px 12px",
    fontSize: "14px",
    color: "#171F22",
  },

  courseTitle: {
    fontSize: "14px",
  },

  levelBadge: {
    background: "#EAEAEA",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  active: {
    background: "#D6F5DD",
    color: "#1A7F37",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  inactive: {
    background: "#FFE5E5",
    color: "#D92D20",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  actionBtns: {
    display: "flex",
    gap: "8px",
  },

  editBtn: {
    background: "#EEF4FF",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#155EEF",
  },

  deleteBtn: {
    background: "#FFECEC",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#D92D20",
  },

  empty: {
    textAlign: "center",
    padding: "30px",
    color: "#777",
    fontSize: "14px",
  },

  viewBtn: {
  background: "#E8F1FF",
  border: "none",
  padding: "8px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "#2563EB",
},
mentorBadge: {
  background: "#EEF2FF",
  color: "#4338CA",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
},
};