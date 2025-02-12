import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import ContentLayout from "./components/layouts/ContentLayout";
import { SeekerSidebarSections } from "./components/SidebarSection";

import { SubscriptionProvider } from "@core/contexts/SeekerSubscriptionContext";
import SeekerDashboard from "./pages/SeekerDashboard";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import PricingPage from "./pages/PricingPage";
import FindJobsPage from "../shared/FindJobsPage";
import ViewJobPage from "../shared/ViewJobPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import NotificationsPage from "./pages/NotificationsPage";
import MyApplicationViewPage from "./pages/MyApplicationViewPage";
import BrowseCompaniesPage from "./pages/BrowseCompaniesPage";
import MessagesPage from "../shared/MessagesPage";
import MySchedulesPage from "../shared/MySchedulesPage";


const SeekerRoutes = () => {

  return (
    <SubscriptionProvider>
      <Routes>
        <Route element={<DashboardLayout Sidebar={<Sidebar sections={SeekerSidebarSections} />} ContentLayout={ContentLayout} />}>
          <Route path="/" element={<SeekerDashboard />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage mode="edit" />} />
          <Route path="/schedules" element={<MySchedulesPage />} />
          <Route path="/find-jobs" element={<FindJobsPage viewJobBaseUrl="/seeker/view-job"/>} />
          <Route path="/browse-companies" element={<BrowseCompaniesPage />} />
          <Route path="/view-job/:id" element={<ViewJobPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
          <Route path="/my-application/:id" element={<MyApplicationViewPage />} />
          <Route path="/pricing-plans" element={<PricingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to={"/seeker"} />} />
        </Route>
      </Routes>
    </SubscriptionProvider>
  );
}

export default SeekerRoutes;
