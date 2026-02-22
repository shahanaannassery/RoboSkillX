import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/common/RoleSelection";
import LearnerRegister from "./pages/learner/LearnerRegister";
import LearnerLogin from "./pages/learner/LearnerLogin";
import LearnerOnboarding from "./pages/learner/LearnerOnboarding";
import Dashboard from "./pages/learner/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/learner/ForgotPassword";
import VerifyOTP from "./pages/learner/VerifyOTP";
import ResetPassword from "./pages/learner/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/learner/register" element={<LearnerRegister />} />
        <Route path="/login" element={<LearnerLogin />} />
        <Route path="/experience-setup" element={<LearnerOnboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

       <ToastContainer
        position="top-center"
        autoClose={1800}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        toastStyle={{
          background: "#E6F9ED",      // light green
          color: "#0A7A33",           // dark green text
          borderRadius: "14px",       // round corners
          minHeight: "40px",          // smaller height
          fontSize: "14px",
          padding: "8px 14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          />
    </BrowserRouter>
  );
}

export default App;
