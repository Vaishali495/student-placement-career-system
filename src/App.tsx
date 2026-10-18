import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import DashboardView from "./views/student/DashboardView";
import MyApplicationView from "./views/student/MyApplicationsView";
import LearningResourcesView from "./views/student/LearningResourcesView";
import ProfileView from "./views/student/ProfileView";
import CareerManagementView from "./views/student/CareerManagementView";
import DashboardLayout from "./components/DashboardLayout";
import PlacementDrivesView from "./views/student/PlacementDrivesView";

function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />

      {/* Student Portal Base Route */}
      <Route path="/student" element={<DashboardLayout />}>
        {/* /student/dashboard */}
        <Route path="dashboard" element={<DashboardView />} />

        {/* Other Child Routes */}
        <Route path="drives" element={<PlacementDrivesView />} />
        <Route path="applications" element={<MyApplicationView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="career" element={<CareerManagementView />} />
        <Route path="learning" element={<LearningResourcesView />} />

        {/* Direct /student to /student/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Global Fallback (Must have leading slash '/') */}
      <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
    </Routes>
  );
}

export default App;