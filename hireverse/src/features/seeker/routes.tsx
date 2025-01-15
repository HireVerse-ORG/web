import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import ContentLayout from "./components/layouts/ContentLayout";
import { SeekerSidebarSections } from "./components/SidebarSection";

import SeekerDashboard from "./pages/SeekerDashboard";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import PricingPage from "./pages/PricingPage";


const SeekerRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout Sidebar={<Sidebar sections={SeekerSidebarSections} />} ContentLayout={ContentLayout}/>}>
        <Route path="/" element={<SeekerDashboard />} />
        <Route path="/profile" element={<ProfilePage mode="edit" />} />
        <Route path="/pricing" element={<PricingPage/>} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={"/seeker"} />} />
      </Route>
    </Routes>
  );
}

export default SeekerRoutes;
