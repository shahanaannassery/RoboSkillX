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
import DashboardLayout from "./components/layout/DashboardLayout";

// learner course
import LearnerCourses from "./pages/learner/LearnerCourses";
import LearnerCourseDetails from "./pages/learner/LearnerCourseDetails";
import LearnerSessionDetails from "./pages/learner/LearnerSessionDetails";
import LearnerQuiz from "./pages/learner/LearnerQuiz";






import MentorRegister from "./pages/mentor/MentorRegister";
import MentorLogin from "./pages/mentor/MentorLogin";
import MentorProfileSetup from "./pages/mentor/MentorProfileSetup";
import MentorReviewStatus from "./pages/mentor/MentorReviewStatus";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import AdminVerifyOTP from "./pages/admin/AdminVerifyOTP";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/layout/AdminLayout";
import MentorApproval from "./pages/admin/MentorApproval";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import Users from "./pages/admin/Users";

import CreateCourse from "./pages/admin/CreateCourse";
import AdminCourses from "./pages/admin/AdminCourses";
import CourseDetails from "./pages/admin/CourseDetails";
import CreateSession from "./pages/admin/CreateSession";
import AdminSessions from "./pages/admin/AdminSessions";
import SessionDetails from "./pages/admin/SessionDetails";
import EditCourse from "./pages/admin/EditCourse";
import EditSession from "./pages/admin/EditSession";
// mentor 

import MentorLayout from "./components/layout/MentorLayout";
import MySessions from "./pages/mentor/MySessions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* learner */}
        <Route path="/" element={<RoleSelection />} />
        <Route path="/learner/register" element={<LearnerRegister />} />
        <Route path="/login" element={<LearnerLogin />} />
        <Route path="/experience-setup" element={<LearnerOnboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/learner/forgot-password" element={<ForgotPassword />} />
        <Route path="/learner/reset-password" element={<ResetPassword />} />
        <Route path="/learner/courses" element={<LearnerCourses />} />
        <Route path="/learner/courses/:id" element={<LearnerCourseDetails />}/>
        <Route path="/learner/session/:id" element={<LearnerSessionDetails />} />
        <Route path="/learner/session/:id/quiz"element={<LearnerQuiz />}/>







        <Route path="/mentor/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        
        <Route path="/mentor/reset-password" element={<ResetPassword />} />
        <Route path="/mentor/register" element={<MentorRegister />} />
        <Route path="/mentor/login" element={<MentorLogin />} />
        <Route path="/mentor/profile-setup" element={<MentorProfileSetup />} />
        <Route path="/mentor/review-status" element={<MentorReviewStatus />} />
        
        <Route path="/mentor" element={<MentorLayout />}>
        <Route path="dashboard" element={<MentorDashboard />} />
          {/*  mentor pages */}
          <Route path="my-sessions" element={<MySessions />}/>
        </Route>


        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/verify-otp" element={<AdminVerifyOTP />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="mentor-approval" element={<MentorApproval />} />
        <Route path="users" element={<Users />} />

       
        <Route path="courses" element={<AdminCourses />} />
        <Route path="create-course" element={<CreateCourse />}/>
        <Route path="course/:id" element={<CourseDetails />}/>
        <Route path="course/:id/create-session" element={<CreateSession />}/>
        <Route path="sessions" element={<AdminSessions />} />
        <Route path="session/:id" element={<SessionDetails />} />
        <Route path="/admin/edit-course/:id" element={<EditCourse />}/>
        <Route path="/admin/edit-session/:id" element={<EditSession />}/>
        </Route>
        
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
          background: "#E6F9ED",     
          color: "#0A7A33",           
          borderRadius: "14px",       
          minHeight: "40px",          
          fontSize: "14px",
          padding: "8px 14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          />
    </BrowserRouter>
  );
}

export default App;
