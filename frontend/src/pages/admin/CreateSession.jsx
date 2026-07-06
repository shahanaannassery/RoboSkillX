import React, {
  useState,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

function CreateSession() {

  const navigate = useNavigate();

  const { id } = useParams();

  // SESSION DATA
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      duration: "",

      project_title: "",
      project_description: "",
    });

  // FILES
  const [video, setVideo] =
    useState(null);

  const [materials, setMaterials] =
    useState(null);

  const [circuitDiagram,
    setCircuitDiagram] =
    useState(null);

  // MULTIPLE QUIZ QUESTIONS
  const [quizQuestions,
    setQuizQuestions] = useState([
      {
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
      },
    ]);

  // HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // HANDLE QUIZ INPUTS
  const handleQuizChange = (
    index,
    e
  ) => {

    const updatedQuestions =
      [...quizQuestions];

    updatedQuestions[index][
      e.target.name
    ] = e.target.value;

    setQuizQuestions(
      updatedQuestions
    );
  };

  // ADD NEW QUIZ QUESTION
  const addQuizQuestion = () => {

    setQuizQuestions([
      ...quizQuestions,
      {
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
      },
    ]);
  };

  // REMOVE QUIZ QUESTION
  const removeQuestion = (
    index
  ) => {

    const updatedQuestions =
      [...quizQuestions];

    updatedQuestions.splice(
      index,
      1
    );

    setQuizQuestions(
      updatedQuestions
    );
  };

  // SUBMIT SESSION
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const sessionData =
        new FormData();

      // SESSION
      sessionData.append(
        "course",
        id
      );

      sessionData.append(
        "title",
        formData.title
      );

      sessionData.append(
        "description",
        formData.description
      );

      sessionData.append(
        "duration",
        formData.duration
      );

      sessionData.append(
        "project_title",
        formData.project_title
      );

      sessionData.append(
        "project_description",
        formData.project_description
      );

      // FILES
      if (video) {

        sessionData.append(
          "video",
          video
        );

      }

      if (materials) {

        sessionData.append(
          "materials",
          materials
        );

      }

      if (circuitDiagram) {

        sessionData.append(
          "circuit_diagram",
          circuitDiagram
        );

      }

      // CREATE SESSION
      const sessionRes =
        await axios.post(
          "http://localhost:8000/api/admin/sessions/",
          sessionData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      // SESSION ID
      const sessionId =
        sessionRes.data.id;

      // SAVE QUIZ QUESTIONS
      for (
        let i = 0;
        i < quizQuestions.length;
        i++
      ) {

        await axios.post(
          "http://localhost:8000/api/admin/quizzes/",
          {
            session: sessionId,

            question:
              quizQuestions[i]
                .question,

            option_a:
              quizQuestions[i]
                .option_a,

            option_b:
              quizQuestions[i]
                .option_b,

            option_c:
              quizQuestions[i]
                .option_c,

            option_d:
              quizQuestions[i]
                .option_d,

            correct_answer:
              quizQuestions[i]
                .correct_answer,
          }
        );
      }

      toast.success("Session created successfully");

navigate(`/admin/course/${id}`);

    } catch (error) {

      console.log(error);

      toast.error(
  error.response?.data?.message ||
  "Failed to create session"
);

    }
  };

  return (
    <div style={styles.wrapper}>

      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>

          <h1 style={styles.title}>
            Add Session
          </h1>

          <p style={styles.subtitle}>
            Create robotics learning
            session content.
          </p>

        </div>

        {/* FORM */}
        <form
          style={styles.formCard}
          onSubmit={handleSubmit}
        >

          {/* SESSION TITLE */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Session Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Introduction to Arduino"
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
              placeholder="Session description"
              style={styles.textarea}
              required
            />

          </div>

          {/* DURATION */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Duration
            </label>

            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="1 Hour"
              style={styles.input}
            />

          </div>

          {/* VIDEO */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Upload Video
            </label>

            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setVideo(
                  e.target.files[0]
                )
              }
              style={styles.input}
            />

          </div>

          {/* PDF */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Upload Notes / PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setMaterials(
                  e.target.files[0]
                )
              }
              style={styles.input}
            />

          </div>

          {/* CIRCUIT */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Circuit Diagram
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setCircuitDiagram(
                  e.target.files[0]
                )
              }
              style={styles.input}
            />

          </div>

          {/* QUIZ SECTION */}
          <div style={styles.quizBox}>

            <h3 style={styles.quizTitle}>
              Quiz Questions
            </h3>

            {quizQuestions.map(
              (quiz, index) => (

                <div
                  key={index}
                  style={styles.quizCard}
                >

                  <div
                    style={
                      styles.quizHeader
                    }
                  >

                    <h4>
                      Question {index + 1}
                    </h4>

                    {quizQuestions.length >
                      1 && (

                      <button
                        type="button"
                        style={
                          styles.removeBtn
                        }
                        onClick={() =>
                          removeQuestion(
                            index
                          )
                        }
                      >
                        Remove
                      </button>

                    )}

                  </div>

                  {/* QUESTION */}
                  <input
                    type="text"
                    name="question"
                    value={
                      quiz.question
                    }
                    onChange={(e) =>
                      handleQuizChange(
                        index,
                        e
                      )
                    }
                    placeholder="Enter question"
                    style={styles.input}
                  />

                  {/* OPTIONS */}
                  <div style={styles.grid}>

                    <input
                      type="text"
                      name="option_a"
                      value={
                        quiz.option_a
                      }
                      onChange={(e) =>
                        handleQuizChange(
                          index,
                          e
                        )
                      }
                      placeholder="Option A"
                      style={styles.input}
                    />

                    <input
                      type="text"
                      name="option_b"
                      value={
                        quiz.option_b
                      }
                      onChange={(e) =>
                        handleQuizChange(
                          index,
                          e
                        )
                      }
                      placeholder="Option B"
                      style={styles.input}
                    />

                    <input
                      type="text"
                      name="option_c"
                      value={
                        quiz.option_c
                      }
                      onChange={(e) =>
                        handleQuizChange(
                          index,
                          e
                        )
                      }
                      placeholder="Option C"
                      style={styles.input}
                    />

                    <input
                      type="text"
                      name="option_d"
                      value={
                        quiz.option_d
                      }
                      onChange={(e) =>
                        handleQuizChange(
                          index,
                          e
                        )
                      }
                      placeholder="Option D"
                      style={styles.input}
                    />

                  </div>

                  {/* CORRECT ANSWER */}
                  <select
                    name="correct_answer"
                    value={
                      quiz.correct_answer
                    }
                    onChange={(e) =>
                      handleQuizChange(
                        index,
                        e
                      )
                    }
                    style={styles.input}
                  >

                    <option value="">
                      Select Correct Answer
                    </option>

                    <option value="A">
                      A
                    </option>

                    <option value="B">
                      B
                    </option>

                    <option value="C">
                      C
                    </option>

                    <option value="D">
                      D
                    </option>

                  </select>

                </div>

              )
            )}

            {/* ADD BUTTON */}
            <button
              type="button"
              style={styles.addQuizBtn}
              onClick={addQuizQuestion}
            >
              + Add Question
            </button>

          </div>

          {/* PROJECT */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Project Title
            </label>

            <input
              type="text"
              name="project_title"
              value={
                formData.project_title
              }
              onChange={handleChange}
              placeholder="LED Blinking"
              style={styles.input}
            />

          </div>

          {/* PROJECT DESCRIPTION */}
          <div style={styles.formGroup}>

            <label style={styles.label}>
              Project Description
            </label>

            <textarea
              name="project_description"
              value={
                formData.project_description
              }
              onChange={handleChange}
              placeholder="Explain project"
              style={styles.textarea}
            />

          </div>

          {/* BUTTONS */}
          <div style={styles.buttonRow}>

            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() =>
                navigate(
                  `/admin/course/${id}`
                )
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.submitBtn}
            >
              Create Session
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateSession;

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
  },

  subtitle: {
    color: "#555",
    marginTop: "5px",
  },

  formCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    border: "1px solid #ddd",
  },

  formGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
  },

  quizBox: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    background: "#fafafa",
  },

  quizTitle: {
    marginBottom: "15px",
    color: "#171F22",
  },

  quizCard: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
    background: "#fff",
  },

  quizHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  removeBtn: {
    border: "none",
    background: "#dc3545",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  addQuizBtn: {
    padding: "10px 16px",
    border: "none",
    background: "#171F22",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
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
    fontWeight: "600",
  },

};