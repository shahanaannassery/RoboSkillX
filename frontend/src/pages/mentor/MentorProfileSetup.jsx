import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/axios";

function MentorProfileSetup() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name") || "Mentor";

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    primary_expertise: "",
    skills: [],
    experience_years: "",
    bio: "",
    linkedin: "",
    resume: null,
    certificates: [],
  });

  const skillOptions = [
    "Arduino",
    "IoT",
    "Robotics",
    "Electronics",
    "C++",
    "Python",
    "Microcontrollers",
    "Raspberry Pi",
    "AI",
    "Embedded Systems",
  ];

  const expertiseOptions = [
    "Robotics",
    "Artificial Intelligence",
    "IoT",
    "Electronics",
    "Embedded Systems",
  ];

const experienceOptions = [
  { value: "0_1", label: "0-1 Years" },
  { value: "1_3", label: "1-3 Years" },
  { value: "3_5", label: "3-5 Years" },
  { value: "5_plus", label: "5+ Years" },
];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSkill = (skill) => {
    if (form.skills.includes(skill)) {
      setForm({
        ...form,
        skills: form.skills.filter((s) => s !== skill),
      });
    } else {
      setForm({
        ...form,
        skills: [...form.skills, skill],
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "resume") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, certificates: files });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("phone", form.phone);
    formData.append("primary_expertise", form.primary_expertise);
    formData.append("years_of_experience", form.experience_years);
    formData.append("bio", form.bio);
    formData.append("portfolio_url", form.linkedin);

    form.skills.forEach((skill) => {
      formData.append("skills", skill);
    });

    if (form.resume) {
      formData.append("resume", form.resume);
    }

    for (let i = 0; i < form.certificates.length; i++) {
      formData.append("certificates", form.certificates[i]);
    }

    await api.post("mentors/profile-setup/", formData);

    toast.success("Profile submitted for approval 🚀");
    navigate("/mentor/review-status");

  } catch (error) {
    console.error(error);
    toast.error("Failed to submit profile");
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
          Welcome, <strong>{userName}</strong>
        </div>
      </div>

      {/* CENTER */}
      <div style={styles.centerArea}>
        <h1 style={styles.title}>Complete Your Mentor Profile</h1>
        <p style={styles.subtitle}>
          Submit your details for admin verification before starting mentoring
        </p>

        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            {/* BASIC INFO */}
            <h3 style={styles.sectionTitle}>Basic Information</h3>

            <input
              name="full_name"
              placeholder="Full Name"
              style={styles.input}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              style={styles.input}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              style={styles.input}
              onChange={handleChange}
            />

            {/* EXPERTISE */}
            <h3 style={styles.sectionTitle}>Expertise Details</h3>

            <select
              name="primary_expertise"
              style={styles.input}
              onChange={handleChange}
            >
              <option value="">Select your primary expertise</option>
              {expertiseOptions.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>

            <div style={styles.skillsContainer}>
              {skillOptions.map((skill) => (
                <div
                  key={skill}
                  style={{
                    ...styles.skillChip,
                    background: form.skills.includes(skill)
                      ? "#26658C"
                      : "#E3F2F5",
                    color: form.skills.includes(skill) ? "#fff" : "#023859",
                  }}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* EXPERIENCE */}
            <h3 style={styles.sectionTitle}>Experience</h3>

           <select
  name="experience_years"
  style={styles.input}
  onChange={handleChange}
>
  <option value="">Select years of experience</option>

  {experienceOptions.map((exp) => (
    <option key={exp.value} value={exp.value}>
      {exp.label}
    </option>
  ))}
</select>

            <textarea
              name="bio"
              placeholder="Short Bio"
              style={styles.textarea}
              onChange={handleChange}
            />

            {/* DOCUMENTS */}
            <h3 style={styles.sectionTitle}>Certificates</h3>

            <label style={styles.uploadLabel}>Upload Resume *</label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <small style={styles.smallText}>
              Required: PDF, DOC | Max file size: 5 MB
            </small>

            <label style={styles.uploadLabel}>Upload Certificates</label>
            <input
              type="file"
              name="certificates"
              multiple
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
            />
            <small style={styles.smallText}>
              Optional: PDF, JPG, PNG | Max file size: 10 MB per file
            </small>

            <input
              name="linkedin"
              placeholder="Portfolio / LinkedIn URL"
              style={styles.input}
              onChange={handleChange}
            />

            <button type="submit" style={styles.primaryBtn}>
              Submit for Approval
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © 2026 RoboSkillX. All rights reserved.
      </div>
    </div>
  );
}

export default MentorProfileSetup;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#A7EBF2",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#8FD6DE",
    padding: "10px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #54ACBF",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#26658C",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontWeight: "bold",
    color: "#011C40",
  },
  headerRight: {
    color: "#011C40",
    fontSize: "14px",
  },
  centerArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
  },
  title: {
    color: "#011C40",
  },
  subtitle: {
    color: "#023859",
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    width: "500px",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    marginTop: 20,
    color: "#011C40",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #54ACBF",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #54ACBF",
    minHeight: "80px",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px",
  },
  skillChip: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    cursor: "pointer",
  },
  uploadLabel: {
    marginTop: "15px",
    display: "block",
    fontWeight: "bold",
  },
  smallText: {
    fontSize: "11px",
    color: "#023859",
  },
  primaryBtn: {
    width: "100%",
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    marginTop: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  footer: {
    background: "#8FD6DE",
    padding: "10px",
    textAlign: "center",
    fontSize: "12px",
    color: "#023859",
  },
};