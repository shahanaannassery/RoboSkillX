import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get values from VerifyOTP
  const { email, otp, role } = location.state || {};

  const [form, setForm] = useState({
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/reset-password/",
        { ...form, email, otp }
      );

      toast.success("Password reset successful ✅");

      setTimeout(() => {
        if (role === "mentor") {
          navigate("/mentor/login");
        } else {
          navigate("/login");
        }
      }, 1500);

    } catch {
      toast.error("Password reset failed ❌");
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
          <span style={styles.headerText}>Already have an account?</span>
          <button
            style={styles.signInBtn}
            onClick={() =>
              role === "mentor"
                ? navigate("/mentor/login")
                : navigate("/login")
            }
          >
            Sign In
          </button>
        </div>
      </div>

      {/* CENTER */}
      <div style={styles.centerArea}>
        <div style={styles.card}>
          <h2 style={styles.title}>Reset Password</h2>

          <p style={styles.subtitle}>
            Create a new secure password to regain access.
          </p>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              name="new_password"
              placeholder="Enter new password"
              required
              style={styles.input}
              onChange={handleChange}
            />

            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm new password"
              required
              style={styles.input}
              onChange={handleChange}
            />

            <button style={styles.btn}>Update Password</button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © 2025 RoboSkillX. All rights reserved.
      </div>

    </div>
  );
}

export default ResetPassword;

const styles = {
  page: {
    height: "100vh",
    background: "#A7EBF2",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    background: "#8FD6DE",
    padding: "8px 32px",
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
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  headerText: {
    color: "#023859",
    fontSize: "13px",
  },

  signInBtn: {
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  centerArea: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 20,
    width: 350,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  title: {
    textAlign: "center",
    color: "#011C40",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 13,
    color: "#023859",
    marginBottom: 20,
  },

  label: {
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 10,
    display: "block",
    color: "#011C40",
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 4,
    marginBottom: 14,
    borderRadius: 10,
    border: "1px solid #54ACBF",
    outline: "none",
  },

  btn: {
    width: "100%",
    background: "#26658C",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 10,
  },

  footer: {
    background: "#8FD6DE",
    borderTop: "1px solid #54ACBF",
    textAlign: "center",
    padding: "10px",
    color: "#023859",
    fontSize: "12px",
  },
};