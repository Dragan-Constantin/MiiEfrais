import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Planning from "./pages/Planning";
import Grades from "./pages/Grades";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/portal/student/home" element={<StudentDashboard />} />
          <Route path="/portal/admin/home" element={<AdminDashboard />} />
          <Route path="/portal/student/planning" element={<Planning />} />
          <Route path="/portal/student/grades" element={<Grades />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
