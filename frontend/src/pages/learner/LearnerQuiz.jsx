import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
// Using lucide-react for modern, crisp iconography
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";

const API = "http://localhost:8000";

function LearnerQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(
          `${API}/api/learners/sessions/${id}/quiz/`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.length > 0) {
          setQuiz(data[0]);

          const saved = localStorage.getItem(
            `quiz_${data[0].id}`
          );

          if (saved) {
            const result = JSON.parse(saved);

            setSubmitted(true);
            setScore(result.score);

            setPercentage(
              result.score === 1 ? 100 : 0
            );

            setIsCorrect(
              result.score === 1
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSubmit = () => {
    if (!selected) {
      alert("Please select an answer");
      return;
    }

    const correct =
      selected === quiz.correct_answer;

    setIsCorrect(correct);
    setSubmitted(true);

    const marks = correct ? 1 : 0;

    setScore(marks);
    setPercentage((marks / 1) * 100);

    localStorage.setItem(
      `quiz_${quiz.id}`,
      JSON.stringify({
        completed: true,
        score: marks,
      })
    );
  };

  if (!quiz) {
    return (
      <DashboardLayout>
        <div style={styles.loadingContainer}>
          <Loader2 style={styles.spinner} />
          <div style={styles.loadingText}>Loading your assessment...</div>
        </div>
      </DashboardLayout>
    );
  }

  const options = [
    { key: "A", value: quiz.option_a },
    { key: "B", value: quiz.option_b },
    { key: "C", value: quiz.option_c },
    { key: "D", value: quiz.option_d },
  ];

  return (
    <DashboardLayout>
      <div style={styles.page}>
        <div style={styles.card}>
         <div style={styles.header}>
  <button
    style={styles.backBtn}
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
            <h1 style={styles.title}>Quiz Assessment</h1>
            <p style={styles.subtitle}>Test your understanding of this session</p>
          </div>

          <div style={styles.quizBody}>
            <h3 style={styles.question}>
              {quiz.question}
            </h3>

            <div style={styles.optionsList}>
              {options.map((option) => {
                const isSelected = selected === option.key;
                
                // Dynamic styling for professional look post-submission
                let optionBackground = "#fff";
                let optionBorder = "#E2E8F0";
                
                if (isSelected) {
                  optionBackground = "#EFF6FF";
                  optionBorder = "#3B82F6";
                }
                
                return (
                  <label
                    key={option.key}
                    style={{
                      ...styles.option,
                      background: optionBackground,
                      borderColor: optionBorder,
                      opacity: submitted ? 0.8 : 1,
                      cursor: submitted ? "not-allowed" : "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.key}
                      checked={isSelected}
                      disabled={submitted}
                      onChange={(e) => setSelected(e.target.value)}
                      style={styles.radioInput}
                    />

                    <span style={{
                      ...styles.optionText,
                      fontWeight: isSelected ? "600" : "400",
                      color: isSelected ? "#1E40AF" : "#334155"
                    }}>
                      <strong style={styles.optionBadge}>{option.key}</strong> {option.value}
                    </span>
                  </label>
                );
              })}
            </div>

            {!submitted && (
              <button
                style={styles.submitBtn}
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            )}

            {submitted && (
              <div style={styles.resultWrapper}>
                <div style={styles.completionBanner}>
                  <CheckCircle2 size={18} color="#059669" />
                  <span>Quiz Completed</span>
                </div>

                <div
                  style={{
                    ...styles.resultBox,
                    background: isCorrect ? "#F0FDF4" : "#FEF2F2",
                    borderColor: isCorrect ? "#DCFCE7" : "#FEE2E2",
                  }}
                >
                  <div style={styles.resultHeader}>
                    <h2 style={{ ...styles.resultTitle, color: isCorrect ? "#15803D" : "#991B1B" }}>
                      Quiz Metrics
                    </h2>
                    <div style={{
                      ...styles.statusBadge,
                      background: isCorrect ? "#DCFCE7" : "#FEE2E2",
                      color: isCorrect ? "#166534" : "#991B1B"
                    }}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 size={16} style={{ marginRight: 4 }} />
                          PASSED
                        </>
                      ) : (
                        <>
                          <XCircle size={16} style={{ marginRight: 4 }} />
                          FAILED
                        </>
                      )}
                    </div>
                  </div>

                  <div style={styles.statsGrid}>
                    <div style={styles.statItem}>
                      <span style={styles.statLabel}>Score</span>
                      <span style={styles.statValue}>{score} / 1</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statLabel}>Percentage</span>
                      <span style={styles.statValue}>{percentage}%</span>
                    </div>
                  </div>

                  <div style={styles.reviewSection}>
                    <div style={styles.reviewRow}>
                      <span style={styles.reviewLabel}>Your Choice:</span>
                      <span style={{ 
                        ...styles.reviewValue, 
                        color: isCorrect ? "#15803D" : "#B91C1C",
                        fontWeight: "700" 
                      }}>
                        Option {selected}
                      </span>
                    </div>
                    <div style={styles.reviewRow}>
                      <span style={styles.reviewLabel}>Correct Answer:</span>
                      <span style={{ ...styles.reviewValue, color: "#15803D", fontWeight: "700" }}>
                        Option {quiz.correct_answer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LearnerQuiz;

const styles = {
  page: {
    background: "#F8FAFC", 
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },

  loadingContainer: {
    padding: "60px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
  },

  spinner: {
    animation: "spin 1s linear infinite",
    color: "#3B82F6",
    width: "32px",
    height: "32px"
  },

  loadingText: {
    fontSize: "16px",
    color: "#64748B",
    fontWeight: "500"
  },

  card: {
    background: "#ffffff",
    borderRadius: "16px",
    maxWidth: "720px",
    margin: "0 auto",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
    border: "1px solid #E2E8F0",
    overflow: "hidden"
  },

  header: {
    borderBottom: "1px solid #F1F5F9",
    padding: "24px 32px",
    background: "#FAFAFA"
  },

  title: {
    fontSize: "24px",
    color: "#0F172A",
    margin: "0 0 4px 0",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: "14px",
    color: "#64748B",
    margin: 0
  },

  quizBody: {
    padding: "32px"
  },

  question: {
    fontSize: "18px",
    color: "#1E293B",
    marginTop: "0",
    marginBottom: "24px",
    lineHeight: "1.6",
    fontWeight: "600"
  },

  optionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  option: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    border: "1px solid",
    borderRadius: "12px",
    transition: "all 0.2s ease",
  },

  radioInput: {
    width: "18px",
    height: "18px",
    margin: 0,
    cursor: "inherit"
  },

  optionText: {
    fontSize: "15px",
    lineHeight: "1.4"
  },

  optionBadge: {
    marginRight: "8px",
    color: "#64748B"
  },

  submitBtn: {
    marginTop: "28px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    width: "100%",
    padding: "14px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background 0.2s",
  },

  resultWrapper: {
    marginTop: "32px",
  },

  completionBanner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#065F46",
    background: "#D1FAE5",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    width: "fit-content",
    marginBottom: "16px"
  },

  resultBox: {
    padding: "24px",
    borderRadius: "14px",
    border: "1px solid",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    paddingBottom: "12px"
  },

  resultTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700"
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },

  statsGrid: {
    display: "flex",
    gap: "16px",
    marginBottom: "20px"
  },

  statItem: {
    flex: 1,
    background: "rgba(255, 255, 255, 0.6)",
    padding: "14px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    border: "1px solid rgba(0,0,0,0.02)"
  },

  statLabel: {
    fontSize: "12px",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "500"
  },

  statValue: {
    fontSize: "20px",
    color: "#0F172A",
    fontWeight: "700"
  },

  reviewSection: {
    background: "rgba(255, 255, 255, 0.4)",
    padding: "16px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  reviewRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px"
  },

  reviewLabel: {
    color: "#475569",
    fontWeight: "500"
  },

  reviewValue: {
    color: "#0F172A"
  },
  backBtn: {
  background: "#E2E8F0",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "15px",
  fontWeight: "600",
},
};