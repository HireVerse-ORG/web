import { Navigate, Route, Routes } from "react-router-dom";
import SeekerDashboard from "./components/SeekerDashboard";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import { SidebarSection } from "@core/types/sidebar.interface";
import { HomeOutlined, SettingsOutlined } from "@mui/icons-material";
import SettingsPage from "./pages/SettingsPage";

const sections: SidebarSection[] = [
  {
    items: [
      { name: "Dashboard", icon: <HomeOutlined />, path: "/seeker" },
    ],
    divider: true
  },
  {
    name: "Settings",
    items: [
      { name: "Settings", icon: <SettingsOutlined />, path: "/seeker/settings" }
    ]
  }
]

const SeekerRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout Sidebar={<Sidebar sections={sections} />} />}>
        <Route path="/" element={<SeekerDashboard />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={"/seeker"} />} />
      </Route>

    </Routes>
  );
}

export default SeekerRoutes;
