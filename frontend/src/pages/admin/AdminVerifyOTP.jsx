import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminVerifyOTP() {
  const navigate = useNavigate();
  const email = localStorage.getItem("admin_reset_email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/admin/verify-otp/",
        { email, otp: finalOtp }
      );

      toast.success("OTP verified successfully");
      navigate("/admin/reset-password");

    } catch {
      toast.error("Invalid or expired OTP");
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

        <h2 style={styles.title}>OTP Verification</h2>
        <p style={styles.subtitle}>
          Enter the one-time password sent to your registered admin email.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                style={styles.otpInput}
              />
            ))}
          </div>

          <button type="submit" style={styles.button}>
            Verify OTP
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

export default AdminVerifyOTP;

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
    width: "420px",
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

  otpContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },

  otpInput: {
    width: "48px",
    height: "48px",
    textAlign: "center",
    fontSize: "18px",
    border: "1px solid #636467",
    borderRadius: "6px",
    outline: "none",
    color: "#171F22",
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

  footerText: {
    marginTop: "30px",
    fontSize: "12px",
    color: "#666B64",
  },
};