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
import PricingPlansPage from "./pages/PricingPlansPage";
import { CompanySubscriptionProvider } from "@core/contexts/CompanySubscriptionContext";
import EditJobPage from "./pages/EditJobPage";
import CompanyJobViewPage from "./pages/CompanyJobViewPage";
import ApplicantDetailsPage from "./pages/ApplicantDetailsPage";
import ApplicationsListPage from "./pages/ApplicationsListPage";
import NotificationsPage from "../seeker/pages/NotificationsPage";


const CompanyRoutes = () => {
  return (
    <CompanyProvider>
      <CompanySubscriptionProvider>
        <Routes>
          <Route element={<DashboardLayout ContentLayout={DashboardContentLayout} Sidebar={<Sidebar sections={CompanySidebarSections} />} />}>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<CompanyDashboard />} />
              <Route path="/profile" element={<CompanyProfilePage/>} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/edit-job" element={<EditJobPage />} />
              <Route path="/jobs" element={<MyJobsPage />} />
              <Route path="/job/:id" element={<CompanyJobViewPage />} />
              <Route path="/applicants" element={<ApplicationsListPage />} />
              <Route path="/applicant/:id" element={<ApplicantDetailsPage />} />
              <Route path="/pricing-plans" element={<PricingPlansPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="/profile-creation" element={<ProfileCreationPage />} />
          <Route path="*" element={<Navigate to="/company" />} />
        </Routes>
      </CompanySubscriptionProvider>
    </CompanyProvider>
  );
}

export default CompanyRoutes;
