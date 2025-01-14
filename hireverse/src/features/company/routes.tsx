import { Navigate, Route, Routes } from "react-router-dom";
import CompanyDashboard from "./components/CompanyDashboard";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import SettingsPage from "./pages/SettingsPage";
import { CompanySidebarSections } from "./components/SidebarSections";
import { CompanyProvider } from "@core/contexts/CompanyContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import ProfileCreationPage from "./pages/ProfileCreationPage";
import DashboardContentLayout from "./components/layouts/DashboardContentLayout";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import PostJobPage from "./pages/PostJobPage";
import MyJobsPage from "./pages/MyJobsPage";


const CompanyRoutes = () => {
  return (
    <CompanyProvider>
      <Routes>
        <Route element={<DashboardLayout ContentLayout={DashboardContentLayout} Sidebar={<Sidebar sections={CompanySidebarSections} />} />}>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<CompanyDashboard />} />
            <Route path="/profile" element={<CompanyProfilePage mode="edit"/>} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/jobs" element={<MyJobsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="/*" element={<Navigate to="/company" />} />
        </Route>

        <Route path="/profile-creation" element={<ProfileCreationPage />} />
      </Routes>
    </CompanyProvider>
  );
}

export default CompanyRoutes;
