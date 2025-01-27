import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import SkillsPage from "./pages/SkillsPage";
import SettingsPage from "./pages/SettingsPage";
import ContentLayout from "./components/layouts/ContentLayout";
import SeekersPage from "./pages/SeekersPage";
import CompaniesPage from "./pages/CompaniesPage";
import JobCategoryPage from "./pages/JobCategoryPage";
import { AdminSideBarSections } from "./components/SideBarSections";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout ContentLayout={ContentLayout} Sidebar={<Sidebar sections={AdminSideBarSections} />} />}>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/seekers" element={<SeekersPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/job-category" element={<JobCategoryPage />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={'/admin'} />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
