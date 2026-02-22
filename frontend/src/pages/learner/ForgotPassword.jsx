import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/forgot-password/",
        { email }
      );

      toast.success("OTP sent to your email 📩");

      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1500);

    } catch {
      toast.error("Email not registered ❌");
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
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* CENTER */}
      <div style={styles.centerArea}>
        <div style={styles.card}>
          
          {/* ICON */}
          <div style={styles.iconCircle}>
            <FaLock color="#fff" size={20} />
          </div>

          <h2 style={styles.title}>Forgot your password?</h2>

          <p style={styles.subtitle}>
           Enter your email address and we'll send you a 6-digit OTP to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button style={styles.btn}>Verify Email</button>
          </form>

          <p
            style={styles.backLink}
            onClick={() => navigate("/login")}
          >
            Back to Sign In
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        Need help?{" "}
        <span style={styles.supportLink}>Contact support</span>
      </div>

    </div>
  );
}

export default ForgotPassword;

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
    fontSize: "18px",
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
    fontWeight: "bold",
    fontSize: "13px",
  },

  centerArea: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#fff",
    padding: 35,
    borderRadius: 20,
    width: 360,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#26658C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },

  title: {
    color: "#011C40",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 13,
    color: "#023859",
    marginBottom: 20,
  },

  label: {
    display: "block",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 6,
    color: "#011C40",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 18,
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
  },

  backLink: {
    marginTop: 15,
    fontSize: 13,
    color: "#26658C",
    cursor: "pointer",
  },

  footer: {
    background: "#8FD6DE",
    borderTop: "1px solid #54ACBF",
    textAlign: "center",
    padding: "10px",
    color: "#023859",
    fontSize: "12px",
  },

  supportLink: {
    color: "#26658C",
    fontWeight: "bold",
    cursor: "pointer",
  },
};