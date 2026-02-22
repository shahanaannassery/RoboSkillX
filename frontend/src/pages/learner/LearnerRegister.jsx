import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function LearnerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirm_password) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    await axios.post(
      "http://127.0.0.1:8000/api/accounts/learner/register/",
      form
    );

    toast.success("Registered successfully 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (err) {
    toast.error("Registration failed ❌");
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
          <button style={styles.signInBtn} onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div style={styles.centerArea}>
        <h1 style={styles.title}>Create Learner Account</h1>
        <p style={styles.subtitle}>Start learning robotics & smart systems</p>

        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Full Name</label>
            <input
              name="full_name"
              placeholder="Enter your name"
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              style={styles.input}
            />
            

            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create password"
              onChange={handleChange}
              style={styles.input}
            />

            <small style={styles.smallText}>Minimum 8 characters</small>

            <label style={styles.label}>Confirm Password</label>
            <input
              name="confirm_password"
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
              style={styles.input}
            />

            <div
                style={styles.forgotLink}
                onClick={() => navigate("/forgot-password")}
            >
            Forgot password?
            </div>

            <button type="submit" style={styles.primaryBtn}>
              Create Account
            </button>

            {/* Divider */}
            <div style={styles.divider}>
              <div style={styles.line} />
              <span style={styles.dividerText}>or</span>
              <div style={styles.line} />
            </div>

            {/* Google */}
            {/* <button type="button" style={styles.googleBtn}>
              Continue with Google
            </button> */}

            <div style={{ marginTop: 12 }}>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/accounts/google-login/",
          {
            token: credentialResponse.credential,
          }
        );

        const data = res.data.data;

        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user_name", data.user.full_name);

        toast.success("Authenticated");
        navigate("/dashboard");

      } catch (err) {
        console.log(err.response?.data);
        toast.error("Google login failed");
      }
    }}
    onError={() => toast.error("Google Login Failed")}
  />
</div>


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

export default LearnerRegister;

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#A7EBF2",
    fontFamily: "sans-serif",
  },

  /* HEADER */
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
    fontSize: "14px",
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

  /* CENTER */
  centerArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: "28px",
    color: "#011C40",
    marginBottom: "4px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#023859",
    marginBottom: "18px",
  },

  
  card: {
    background: "#FFFFFF",
    width: "300px",
    padding: "18px",
    borderRadius: "16px",
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
    textAlign: "left",
  },

  label: {
    color: "#011C40",
    fontWeight: "bold",
    fontSize: "13px",
    marginTop: "10px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    borderRadius: "8px",
    border: "1px solid #54ACBF",
    outline: "none",
    fontSize: "13px",
  },

  primaryBtn: {
    width: "100%",
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "16px",
    fontSize: "13px",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    margin: "14px 0",
  },

  line: {
    flex: 1,
    height: "1px",
    background: "#54ACBF",
  },

  dividerText: {
    margin: "0 8px",
    fontSize: "12px",
    color: "#023859",
  },

  googleBtn: {
    width: "100%",
    padding: "9px",
    borderRadius: "10px",
    border: "1px solid #54ACBF",
    background: "#FFFFFF",
    cursor: "pointer",
    color: "#011C40",
    fontWeight: "bold",
    fontSize: "13px",
  },

  /* FOOTER */
  footer: {
    background: "#8FD6DE",
    borderTop: "1px solid #54ACBF",
    textAlign: "center",
    padding: "10px",
    color: "#023859",
    fontSize: "12px",
  },

  smallText: {
  fontSize: "11px",
  color: "#023859",
  display: "block",
  marginTop: "4px",
},

forgotLink: {
  textAlign: "right",
  marginTop: "8px",
  fontSize: "13px",
  color: "#26658C",
  cursor: "pointer",
  fontWeight: "600",
},
};
