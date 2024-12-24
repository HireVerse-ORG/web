import { Navigate, Route, Routes } from "react-router-dom";
import CompanyDashboard from "./components/CompanyDashboard";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import { SidebarSection } from "@core/types/sidebar.interface";
import { HomeOutlined, SettingsOutlined } from "@mui/icons-material";
import SettingsPage from "./pages/SettingsPage";

const sections: SidebarSection[] = [
  {
    items: [
      { name: "Dashboard", icon: <HomeOutlined />, path: "/company" },
    ],
    divider: true
  },
  {
    name: "Settings",
    items: [
      { name: "Settings", icon: <SettingsOutlined />, path: "/company/settings" }
    ]
  }
]

const CompanyRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout Sidebar={<Sidebar sections={sections} />} />}>
        <Route path="/" element={<CompanyDashboard />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/*" element={<Navigate to={"/company"} />} />
      </Route>
    </Routes>
  );
}

export default CompanyRoutes;
