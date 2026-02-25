import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
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
        "http://127.0.0.1:8000/api/accounts/admin/login/",
        form
      );

      const data = res.data.data;

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_name", data.user.full_name);
      localStorage.setItem("user_role", data.user.role);

      toast.success("Admin authenticated");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);

    } catch (err) {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Center Logo */}
        <div style={styles.logoWrapper}>
          <div style={styles.logoIcon}>🤖</div>
          <div style={styles.logoText}>RoboSkillX</div>
        </div>

        <div style={styles.subtitle}>Admin Control Panel</div>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Admin Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Forgot Password */}
          <div
            style={styles.forgot}
            onClick={() => navigate("/admin/forgot-password")}
          >
            Forgot password?
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <div style={styles.footerText}>
          Authorized Personnel Only
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

/* =================== STRICT ADMIN THEME =================== */

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
    background: "#FFFFFF",
    padding: "50px 40px",
    width: "420px",
    borderRadius: "8px",
    border: "1px solid #636467",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  logoWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10px",
  },

  logoIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    background: "#666B64",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    marginBottom: "8px",
  },

  logoText: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#171F22",
  },

  subtitle: {
    fontSize: "13px",
    color: "#666B64",
    marginBottom: "30px",
    letterSpacing: "1px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#171F22",
    display: "block",
    textAlign: "left",
    marginBottom: "6px",
    marginTop: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #636467",
    fontSize: "14px",
    outline: "none",
  },

  forgot: {
    textAlign: "right",
    marginTop: "8px",
    fontSize: "13px",
    color: "#171F22",
    cursor: "pointer",
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
    marginTop: "25px",
    fontSize: "12px",
    color: "#666B64",
  },
};