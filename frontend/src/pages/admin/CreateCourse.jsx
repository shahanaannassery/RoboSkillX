import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

import {
  useNavigate,
} from "react-router-dom";


function CreateCourse() {

  const navigate = useNavigate();

  // APPROVED MENTORS
  const [mentors, setMentors] =
    useState([]);

  // FORM DATA
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      level: "Beginner",
      thumbnail: null,
      duration: "",
      total_sessions: "",
      mentors: [],
      price: "",
      status: "Draft",
    });

  // FETCH APPROVED MENTORS
  const fetchMentors = async () => {

    try {

 const res = await axios.get(
  "http://localhost:8000/api/mentors/approved-mentors/"
);

// console.log("Mentors API:", res.data);

setMentors(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // LOAD MENTORS
  useEffect(() => {

// eslint-disable-next-line
    fetchMentors();

  }, []);

  // HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {

    setFormData({
      ...formData,
      thumbnail: e.target.files[0],
    });

  };

  // CREATE COURSE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const courseData =
        new FormData();

      courseData.append(
        "title",
        formData.title
      );

      courseData.append(
        "description",
        formData.description
      );

      courseData.append(
        "level",
        formData.level
      );

      courseData.append(
        "duration",
        formData.duration
      );

      courseData.append(
        "total_sessions",
        formData.total_sessions
      );

      formData.mentors.forEach((mentorId) => {
  courseData.append(
    "mentors",
    mentorId
  );
});

      courseData.append(
        "price",
        formData.price
      );

      courseData.append(
        "status",
        formData.status
      );

      // IMAGE
      if (formData.thumbnail) {

        courseData.append(
          "thumbnail",
          formData.thumbnail
        );

      }

      // API
      await axios.post(
        "http://localhost:8000/api/admin/courses/",
        courseData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

     toast.success("Course created successfully");

navigate("/admin/courses");

    } catch (error) {

      console.log(error);

     toast.error("Failed to create course");
    }
  };

  return (
    <div style={styles.wrapper}>

      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>

          <div>

            <h1 style={styles.title}>
              Create Course
            </h1>

            <p style={styles.subtitle}>
              Add robotics learning
              course for learners.
            </p>

          </div>

        </div>

        {/* FORM */}
        <form
          style={styles.formCard}
          onSubmit={handleSubmit}
        >

          {/* TITLE */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Course Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Arduino Robotics"
              style={styles.input}
              required
            />

          </div>

          {/* DESCRIPTION */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              style={styles.textarea}
              required
            />

          </div>

          {/* GRID */}
          <div style={styles.grid}>

            {/* LEVEL */}
            <div style={styles.formGroup}>

              <label style={styles.label}>
                Level
              </label>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                style={styles.select}
              >

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>

              </select>

            </div>

            {/* TOTAL SESSIONS */}
            <div style={styles.formGroup}>

              <label style={styles.label}>
                Total Sessions
              </label>

              <input
                type="number"
                name="total_sessions"
                value={
                  formData.total_sessions
                }
                onChange={handleChange}
                placeholder="10"
                style={styles.input}
              />

            </div>

          </div>

          {/* THUMBNAIL */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Thumbnail Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
            />

          </div>

          {/* GRID */}
          <div style={styles.grid}>

            {/* DURATION */}
            <div style={styles.formGroup}>

              <label style={styles.label}>
                Estimated Duration
              </label>

              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="10 Weeks"
                style={styles.input}
              />

            </div>

           {/* MENTORS */}
<div style={styles.formGroup}>

  <label style={styles.label}>
    Assign Mentors
  </label>

  <div style={styles.mentorSelector}>

    {mentors.map((mentor) => {

      const isSelected =
        formData.mentors.includes(
          mentor.id
        );

      return (

        <div
          key={mentor.id}
          style={{
            ...styles.mentorChip,
            background: isSelected
              ? "#666B64"
              : "#F5F5F5",
            color: isSelected
              ? "#fff"
              : "#171F22",
          }}
          onClick={() => {

            if (isSelected) {

              setFormData({
                ...formData,
                mentors:
                  formData.mentors.filter(
                    (id) =>
                      id !== mentor.id
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

          <div
            style={{
              ...styles.circle,
              background: isSelected
                ? "#fff"
                : "transparent",
            }}
          />

          {mentor.name}

        </div>

      );

    })}

  </div>

</div>
          </div>

          {/* GRID */}
          <div style={styles.grid}>

            {/* PRICE */}
            <div style={styles.formGroup}>

              <label style={styles.label}>
                Course Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="1999"
                style={styles.input}
              />

            </div>

            {/* STATUS */}
            <div style={styles.formGroup}>

              <label style={styles.label}>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.select}
              >

                <option value="Draft">
                  Draft
                </option>

                <option value="Published">
                  Published
                </option>

              </select>

            </div>

          </div>

          {/* BUTTONS */}
          <div style={styles.buttonRow}>

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
              style={styles.submitBtn}
            >
              Create Course
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateCourse;

/* ================= STYLES ================= */

const styles = {

  wrapper: {
    background: "#C1D1CF",
    minHeight: "100vh",
    padding: "20px",
  },

  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  header: {
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

  formCard: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "25px",
  },

  formGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
  },

  select: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "20px",
  },

  cancelBtn: {
    padding: "12px 20px",
    border: "1px solid #999",
    background: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },

  submitBtn: {
    padding: "12px 20px",
    border: "none",
    background: "#666B64",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },
  mentorSelector: {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
},

mentorChip: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 16px",
  borderRadius: "30px",
  cursor: "pointer",
  transition: "0.2s",
  border: "1px solid #ddd",
},

circle: {
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  border: "2px solid currentColor",
},

};