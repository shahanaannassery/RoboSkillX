import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MentorLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/mentor/login/",
        form
      );

      const data = res.data.data;

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_name", data.user.full_name);
      localStorage.setItem("user_email", data.user.email);
      localStorage.setItem("user_role", data.user.role);

      toast.success("Mentor authenticated");

      // 🔥 Redirect based on onboarding
      if (!data.onboarding_completed) {
      navigate("/mentor/profile-setup");
    } else if (!data.is_approved) {
      navigate("/mentor/review-status");
    } else {
      navigate("/mentor/dashboard");
    }

    } catch (err) {
      toast.error("Invalid email or password");
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
      </div>

      {/* CENTER */}
      <div style={styles.centerArea}>
        <h1 style={styles.title}>Mentor Sign In</h1>
        <p style={styles.subtitle}>
          Access your mentor dashboard and manage your sessions
        </p>

        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              style={styles.input}
              required
            />
<div
  style={styles.forgotLink}
  onClick={() => navigate("/mentor/forgot-password")}
>
  Forgot password?
</div>

            <button type="submit" style={styles.primaryBtn}>
              Sign In
            </button>

            <div style={styles.bottomText}>
              Don’t have a mentor account?{" "}
              <span
                style={styles.signupLink}
                onClick={() => navigate("/mentor/register")}
              >
                Sign up
              </span>
            </div>

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

export default MentorLogin;


/* SAME STYLES — NO CHANGE */
const styles = {
  page: {
    height: "100vh",
    background: "#A7EBF2",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    background: "#8FD6DE",
    padding: "10px 32px",
    borderBottom: "1px solid #54ACBF",
  },

  logoWrap: {
    display: "flex",
    gap: "8px",
    cursor: "pointer",
    alignItems: "center",
  },

  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
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

  centerArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: { fontSize: 28, color: "#011C40" },
  subtitle: { fontSize: 14, color: "#023859", marginBottom: 18 },

  card: {
    background: "#fff",
    width: 300,
    padding: 18,
    borderRadius: 16,
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  },

  label: {
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 10,
    display: "block",
  },

  input: {
    width: "100%",
    padding: 8,
    marginTop: 4,
    borderRadius: 8,
    border: "1px solid #54ACBF",
  },

  primaryBtn: {
    width: "100%",
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: 10,
    borderRadius: 10,
    marginTop: 16,
    cursor: "pointer",
  },

  forgotLink: {
    textAlign: "right",
    marginTop: 8,
    fontSize: 13,
    color: "#26658C",
    cursor: "pointer",
  },

  bottomText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 13,
  },

  footer: {
    background: "#8FD6DE",
    borderTop: "1px solid #54ACBF",
    textAlign: "center",
    padding: "10px",
    color: "#023859",
    fontSize: "12px",
  },

  signupLink: {
    color: "#26658C",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};