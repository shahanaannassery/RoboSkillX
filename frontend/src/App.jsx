import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/common/RoleSelection";
import LearnerRegister from "./pages/learner/LearnerRegister";
import LearnerLogin from "./pages/learner/LearnerLogin";
import LearnerOnboarding from "./pages/learner/LearnerOnboarding";
import Dashboard from "./pages/learner/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/learner/register" element={<LearnerRegister />} />
        <Route path="/login" element={<LearnerLogin />} />
        <Route path="/experience-setup" element={<LearnerOnboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
