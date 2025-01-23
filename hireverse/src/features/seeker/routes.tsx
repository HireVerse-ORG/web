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


const SeekerRoutes = () => {

  return (
    <SubscriptionProvider>
      <Routes>
        <Route element={<DashboardLayout Sidebar={<Sidebar sections={SeekerSidebarSections} />} ContentLayout={ContentLayout} />}>
          <Route path="/" element={<SeekerDashboard />} />
          <Route path="/profile" element={<ProfilePage mode="edit" />} />
          <Route path="/find-jobs" element={<FindJobsPage />} />
          <Route path="/pricing-plans" element={<PricingPage />} />

          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to={"/seeker"} />} />
        </Route>
      </Routes>
    </SubscriptionProvider>
  );
}

export default SeekerRoutes;
