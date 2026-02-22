import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LearnerOnboarding() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name") || "Learner";

  const [form, setForm] = useState({
    age_group: "under_13",
    skill_level: "beginner",
    interests: ["robotics"],
    uses_laptop: true,
    uses_mobile: false,
    has_hardware_kit: false,
  });

  const setField = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const toggleInterest = (interest) => {
    if (form.interests.includes(interest)) {
      setForm({
        ...form,
        interests: form.interests.filter((i) => i !== interest),
      });
    } else {
      setForm({ ...form, interests: [...form.interests, interest] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      await axios.post(
        "http://127.0.0.1:8000/api/learners/onboarding/",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/dashboard");
    } catch {
      alert("Failed to save onboarding");
    }
  };

  return (
    <div style={styles.page}>
     {/* HEADER */}
<div style={styles.header}>
  <div style={styles.logoWrap} onClick={() => navigate("/")}>
   <div style={styles.logoIcon}>🤖</div>
    <div style={styles.logoText}>RoboSkillX</div>
  </div>

  <div style={styles.headerRight}>
    <span style={styles.welcomeText}>Welcome, {userName}</span>
  </div>
</div>

      {/* CENTER */}
      <div style={styles.centerArea}>
        <h1 style={styles.title}>Set Up Your Learning Experience</h1>
        <p style={styles.subtitle}>
          Help us personalize your RoboSkillX journey.
        </p>

        <form onSubmit={handleSubmit} style={styles.card}>
          {/* AGE GROUP */}
          <label style={styles.label}>Age Group</label>
          <div style={styles.pillRow}>
            {[
              ["under_13", "Under 13"],
              ["13_18", "13–18"],
              ["18_25", "18–25"],
              ["25_plus", "25+"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => setField("age_group", value)}
                style={{
                  ...styles.pill,
                  ...(form.age_group === value ? styles.pillActive : {}),
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* SKILL */}
          <label style={styles.label}>Current Skill Level</label>
          {["beginner", "intermediate", "advanced"].map((lvl) => (
            <div
              key={lvl}
              onClick={() => setField("skill_level", lvl)}
              style={{
                ...styles.skillCard,
                ...(form.skill_level === lvl ? styles.skillActive : {}),
              }}
            >
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </div>
          ))}

          {/* INTERESTS */}
          <label style={styles.label}>Interests</label>
          <div style={styles.pillRow}>
            {["robotics", "electronics", "circuit_design"].map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => toggleInterest(i)}
                style={{
                  ...styles.pill,
                  ...(form.interests.includes(i) ? styles.pillActive : {}),
                }}
              >
                {i.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* DEVICES */}
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={form.uses_laptop}
              onChange={(e) => setField("uses_laptop", e.target.checked)}
            />
            Laptop / Desktop
          </label>

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={form.uses_mobile}
              onChange={(e) => setField("uses_mobile", e.target.checked)}
            />
            Mobile / Tablet
          </label>

          {/* HARDWARE */}
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={form.has_hardware_kit}
              onChange={(e) =>
                setField("has_hardware_kit", e.target.checked)
              }
            />
            I have a robotics hardware kit
          </label>

          <button style={styles.primaryBtn}>
            Continue to Dashboard
          </button>
        </form>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © 2025 RoboSkillX. All rights reserved.
      </div>
    </div>
  );
}

export default LearnerOnboarding;




const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#A7EBF2",
    fontFamily: "sans-serif",
  },

 header: {
  background: "#8FD6DE",
  padding: "8px 32px",
  display: "flex",
  justifyContent: "space-between",   
  alignItems: "center",
  borderBottom: "1px solid #54ACBF",
},

headerRight: {
  display: "flex",
  alignItems: "center",
},

welcomeText: {
  color: "#023859",
  fontSize: "13px",
  fontWeight: "600",
},

  logoWrap: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" },
  logoIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#26658C",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  logoText: { fontSize: "18px", fontWeight: "bold", color: "#011C40" },

  centerArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: { fontSize: "26px", color: "#011C40", marginBottom: "4px" },
  subtitle: { fontSize: "13px", color: "#023859", marginBottom: "14px" },
card: {
  background: "#FFFFFF",
  width: "300px",          
  padding: "18px",
  borderRadius: "18px",    
  boxShadow: "0 12px 24px rgba(0,0,0,0.12)", 
},

  label: { fontWeight: "bold", fontSize: "13px", marginTop: "10px", display: "block" },

  pillRow: { display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" },

  pill: {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid #54ACBF",
    background: "#fff",
    fontSize: "12px",
    cursor: "pointer",
  },

  pillActive: { background: "#26658C", color: "#fff", border: "none" },

  skillCard: {
    border: "1px solid #54ACBF",
    borderRadius: "10px",
    padding: "8px",
    marginTop: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },

  skillActive: { background: "#E6F4F7", border: "2px solid #26658C" },

  checkbox: { display: "block", marginTop: "8px", fontSize: "13px" },

  primaryBtn: {
    width: "100%",
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
  },

  footer: {
    background: "#8FD6DE",
    borderTop: "1px solid #54ACBF",
    textAlign: "center",
    padding: "10px",
    color: "#023859",
    fontSize: "12px",
  },
  welcome: {
  fontSize: "13px",
  color: "#023859",
  fontWeight: "600",
},
};
