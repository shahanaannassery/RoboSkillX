import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminResetPassword() {
  const navigate = useNavigate();
  const email = localStorage.getItem("admin_reset_email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/admin/reset-password/",
        { email, new_password: password }
      );

      toast.success("Password updated successfully");
      navigate("/admin/login");

    } catch {
      toast.error("Password reset failed");
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

        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>
          Create a new password to regain admin access.
        </p>

        <form onSubmit={handleSubmit}>
          
          <label style={styles.label}>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Confirm New Password</label>
          <input
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />

          {/* Password Rules Box */}
          <div style={styles.rulesBox}>
            <strong>Password Requirements:</strong>
            <ul style={styles.rulesList}>
              <li>Minimum 8 characters</li>
              <li>Include uppercase & lowercase letters</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
            </ul>
          </div>

          <button type="submit" style={styles.button}>
            Update Password
          </button>
        </form>

        <div style={styles.footerText}>
          Secure Admin Environment<br />
          Authorized administrators only
        </div>

      </div>
    </div>
  );
}

export default AdminResetPassword;

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
    marginBottom: "30px",
  },

  label: {
    display: "block",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    color: "#171F22",
    marginBottom: "6px",
    marginTop: "15px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #636467",
    fontSize: "14px",
    outline: "none",
  },

  rulesBox: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #636467",
    borderRadius: "6px",
    textAlign: "left",
    fontSize: "13px",
    color: "#171F22",
  },

  rulesList: {
    marginTop: "10px",
    paddingLeft: "18px",
    lineHeight: "1.6",
  },

  button: {
    width: "100%",
    marginTop: "25px",
    padding: "12px",
    background: "#666B64",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  footerText: {
    marginTop: "30px",
    fontSize: "12px",
    color: "#666B64",
  },
};