import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/admin/forgot-password/",
        { email }
      );

      toast.success("OTP sent successfully");

      localStorage.setItem("admin_reset_email", email);
      navigate("/admin/verify-otp");

    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🤖</div>
          <div style={styles.logoText}>RoboSkillX</div>
        </div>

        <h2 style={styles.title}>Verify Admin Email</h2>
        <p style={styles.subtitle}>
          Confirm your registered admin email address to continue.
        </p>

        {/* Info Box */}
        <div style={styles.infoBox}>
          This step helps us verify your identity before continuing password recovery.
        </div>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Admin Email</label>
          <input
            type="email"
            placeholder="Enter registered admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Verify Email
          </button>
        </form>

        <div
          style={styles.backLink}
          onClick={() => navigate("/admin/login")}
        >
          ← Back to Admin Login
        </div>

        <div style={styles.footerText}>
          Secure Admin Environment<br />
          Authorized administrators only
        </div>

      </div>
    </div>
  );
}

export default AdminForgotPassword;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#C1D1CF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
  },

  card: {
    width: "430px",
    background: "#FFFFFF",
    padding: "50px 40px",
    border: "1px solid #636467",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  logoWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  },

  logoIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    background: "#666B64",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },

  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#171F22",
  },

  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#171F22",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#666B64",
    marginBottom: "25px",
  },

  infoBox: {
    border: "1px solid #636467",
    borderRadius: "6px",
    padding: "15px",
    fontSize: "13px",
    color: "#171F22",
    marginBottom: "25px",
    textAlign: "left",
  },

  label: {
    display: "block",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    color: "#171F22",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #636467",
    fontSize: "14px",
    outline: "none",
    marginBottom: "20px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#666B64",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  backLink: {
    marginTop: "20px",
    fontSize: "13px",
    color: "#666B64",
    cursor: "pointer",
  },

  footerText: {
    marginTop: "30px",
    fontSize: "12px",
    color: "#666B64",
  },
};