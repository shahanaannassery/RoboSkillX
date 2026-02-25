import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, role } = location.state || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Enter complete 6-digit OTP");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/verify-otp/",
        { email, otp: finalOtp }
      );

      toast.success("OTP Verified ✅");

      setTimeout(() => {
        if (role === "mentor") {
          navigate("/mentor/reset-password", {
            state: { email, otp: finalOtp, role }
          });
        } else {
          navigate("/learner/reset-password", {
            state: { email, otp: finalOtp, role }
          });
        }
      }, 1500);

    } catch {
      toast.error("Invalid OTP ❌");
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
          <div style={styles.iconCircle}>✓</div>

          <h2 style={styles.title}>Verify Your Email</h2>

          <p style={styles.subtitle}>
            We've sent a 6-digit code to your email address.
            Enter it below to verify your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  ref={(el) => (inputsRef.current[index] = el)}
                  style={styles.otpInput}
                />
              ))}
            </div>

            <button style={styles.btn}>Verify Code</button>
          </form>

          <p style={styles.resend}>
            Didn't receive the code?{" "}
            <span style={styles.resendLink}>Resend OTP</span>
          </p>

          <p
            style={styles.backLink}
            onClick={() =>
              role === "mentor"
                ? navigate("/mentor/register")
                : navigate("/learner/register")
            }
          >
            Back to Sign Up
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © 2025 RoboSkillX. All rights reserved.
      </div>

    </div>
  );
}

export default VerifyOTP;

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
    width: 380,
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#DFF3F6",
    margin: "0 auto 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    color: "#26658C",
  },

  title: {
    marginBottom: 10,
    color: "#011C40",
  },

  subtitle: {
    fontSize: 13,
    color: "#023859",
    marginBottom: 20,
  },

  otpContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  otpInput: {
    width: 45,
    height: 50,
    borderRadius: 10,
    border: "1px solid #54ACBF",
    textAlign: "center",
    fontSize: 18,
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

  resend: {
    marginTop: 15,
    fontSize: 13,
    color: "#023859",
  },

  resendLink: {
    color: "#26658C",
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
};