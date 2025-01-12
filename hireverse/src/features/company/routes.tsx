import { Navigate, Route, Routes } from "react-router-dom";
import CompanyDashboard from "./components/CompanyDashboard";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import SettingsPage from "./pages/SettingsPage";
import { CompanySidebarSections } from "./components/SidebarSections";
import { CompanyProvider } from "@core/contexts/CompanyContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import ProfileCreationPage from "./pages/ProfileCreationPage";


const CompanyRoutes = () => {
  return (
    <CompanyProvider>
      <Routes>
        <Route element={<DashboardLayout Sidebar={<Sidebar sections={CompanySidebarSections} />} />}>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<CompanyDashboard />} />
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
