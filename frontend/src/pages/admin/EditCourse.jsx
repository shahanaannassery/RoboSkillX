import React, {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/axios";

function EditCourse() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]);

  const [formData, setFormData] = useState({

    title: "",
    description: "",
    level: "",
    duration: "",
    total_sessions: "",
    price: "",
    status: "",
    mentors: [],
    thumbnail: null,

  });

  const [preview, setPreview] =
    useState("");

  

  const loadCourse = async () => {

    try {

      const res =
        await api.get(
          `/admin/courses/${id}/`
        );

      const course = res.data;

      setFormData({

        title: course.title,
        description:
          course.description,

        level: course.level,

        duration:
          course.duration,

        total_sessions:
          course.total_sessions,

        price: course.price,

        status: course.status,

        mentors:
          course.mentors || [],

        thumbnail: null,

      });

      setPreview(
        `http://localhost:8000${course.thumbnail}`
      );

    } catch (error) {

      console.log(error);

    }

  };

  const loadMentors = async () => {

    try {

      const res =
        await api.get(
          "/mentors/approved-mentors/"
        );

      setMentors(res.data);

    } catch (error) {

      console.log(error);

    }

  };
  useEffect(() => {

    loadCourse();
    loadMentors();
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleUpdate =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          new FormData();

        data.append(
          "title",
          formData.title
        );

        data.append(
          "description",
          formData.description
        );

        data.append(
          "level",
          formData.level
        );

        data.append(
          "duration",
          formData.duration
        );

        data.append(
          "total_sessions",
          formData.total_sessions
        );

        data.append(
          "price",
          formData.price
        );

        data.append(
          "status",
          formData.status
        );

        formData.mentors.forEach(
          (mentorId) => {

            data.append(
              "mentors",
              mentorId
            );

          }
        );

        if (
          formData.thumbnail
        ) {

          data.append(
            "thumbnail",
            formData.thumbnail
          );

        }

        await api.put(
          `/admin/courses/${id}/update/`,
          data
        );

        navigate(
          "/admin/courses"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div style={styles.container}>

      <div style={styles.pageHeader}>
  <div>
    <h1 style={styles.heading}>
      Edit Course
    </h1>

    <p style={styles.subHeading}>
      Update course information, mentors, pricing and content settings.
    </p>
  </div>

  <button
    type="button"
    style={styles.backBtn}
    onClick={() => navigate("/admin/courses")}
  >
    ← Back to Courses
  </button>
</div>

     <form onSubmit={handleUpdate} style={styles.form}>

  {/* COURSE INFORMATION */}
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>Course Information</h3>

    <label style={styles.label}>Course Title</label>
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      style={styles.input}
    />

    <label style={styles.label}>Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      style={styles.textarea}
    />
  </div>

  {/* COURSE SETTINGS */}
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>Course Settings</h3>

    <div style={styles.row}>

      <div>
        <label style={styles.label}>Level</label>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div>
        <label style={styles.label}>Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div>
        <label style={styles.label}>Sessions</label>
        <input
          type="number"
          name="total_sessions"
          value={formData.total_sessions}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div>
        <label style={styles.label}>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

    </div>

    <label style={styles.label}>Status</label>
    <select
      name="status"
      value={formData.status}
      onChange={handleChange}
      style={styles.input}
    >
      <option>Draft</option>
      <option>Published</option>
    </select>

  </div>

  {/* MENTORS */}
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>Assigned Mentors</h3>

    <div style={styles.mentorGrid}>
      {mentors.map((mentor) => {
        const selected =
          formData.mentors.includes(mentor.id);

        return (
         <div
  key={mentor.id}
  style={{
    ...styles.mentorChip,
    background: selected
      ? "#171F22"
      : "#FFFFFF",
    color: selected
      ? "#FFFFFF"
      : "#171F22",
  }}
  onClick={() => {

    if (selected) {

      setFormData({
        ...formData,
        mentors: formData.mentors.filter(
          (m) => m !== mentor.id
        ),
      });

    } else {

      setFormData({
        ...formData,
        mentors: [
          ...formData.mentors,
          mentor.id,
        ],
      });

    }

  }}
>
  <span style={styles.circle}>
    {selected ? "✓" : ""}
  </span>

  {mentor.name}
</div>
        );
      })}
    </div>
  </div>

  {/* THUMBNAIL */}
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>Course Thumbnail</h3>

    {preview && (
      <img
        src={preview}
        alt=""
        style={styles.preview}
      />
    )}

    <input
      type="file"
      onChange={(e) =>
        setFormData({
          ...formData,
          thumbnail: e.target.files[0],
        })
      }
    />
  </div>

  {/* BUTTONS */}
  <div style={styles.footer}>
    <button
      type="button"
      style={styles.cancelBtn}
      onClick={() =>
        navigate("/admin/courses")
      }
    >
      Cancel
    </button>

    <button
      type="submit"
      style={styles.saveBtn}
    >
      Update Course
    </button>
  </div>

</form>

    </div>

  );

}

export default EditCourse;

const styles = {

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "30px",
  },

  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#171F22",
    marginBottom: "6px",
  },

  subHeading: {
    fontSize: "14px",
    color: "#6B7280",
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

//   form: {
//     background: "#FFFFFF",
//     padding: "30px",
//     borderRadius: "16px",
//     border: "1px solid #E5E7EB",
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//   },
form: {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
},

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#171F22",
    marginBottom: "10px",
  },

//   input: {
//     padding: "12px 14px",
//     border: "1px solid #D1D5DB",
//     borderRadius: "8px",
//     fontSize: "14px",
//     outline: "none",
//   },
input: {
  width: "100%",
  padding: "14px",
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  fontSize: "14px",
  background: "#FFFFFF",
  boxSizing: "border-box",
},

//   textarea: {
//     minHeight: "140px",
//     padding: "12px 14px",
//     border: "1px solid #D1D5DB",
//     borderRadius: "8px",
//     fontSize: "14px",
//     resize: "vertical",
//     outline: "none",
//   },
textarea: {
  width: "100%",
  minHeight: "150px",
  padding: "14px",
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  fontSize: "14px",
  resize: "vertical",
  boxSizing: "border-box",
},

  mentorGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "10px",
  },

  mentorChip: {
    padding: "10px 16px",
    borderRadius: "999px",
    border: "1px solid #D1D5DB",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    userSelect: "none",
    transition: "all 0.2s ease",
  },

  preview: {
    width: "280px",
    height: "170px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid #D1D5DB",
  },

  button: {
    background: "#171F22",
    color: "#FFFFFF",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "10px",
  },
label: {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#171F22",
},
card: {
  background: "#FFFFFF",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid #E5E7EB",
  marginBottom: "20px",
},

cardTitle: {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "20px",
},

row: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
},

footer: {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "20px",
},

cancelBtn: {
  padding: "12px 20px",
  border: "1px solid #D1D5DB",
  background: "#FFFFFF",
  borderRadius: "8px",
  cursor: "pointer",
},

saveBtn: {
  padding: "12px 24px",
  border: "none",
  background: "#171F22",
  color: "#FFFFFF",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
},

};