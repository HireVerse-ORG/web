import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import { SidebarSection } from "@core/types/sidebar.interface";
import { HomeOutlined, SettingsOutlined, StarBorderOutlined } from "@mui/icons-material";
import SkillsPage from "./pages/SkillsPage";
import SettingsPage from "./pages/SettingsPage";
import ContentLayout from "./components/layouts/ContentLayout";

export const sections: SidebarSection[] = [
  {
    items: [
      { name: "Dashboard", icon: <HomeOutlined />, path: "/admin" },
      { name: "Skills", icon: <StarBorderOutlined />, path: "/admin/skills" },
    ],
    divider: true
  },
  {
    name: "Settings",
    items: [
      { name: "Settings", icon: <SettingsOutlined />, path: "/admin/settings" }
    ]
  }
]

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout Sidebar={<Sidebar sections={sections}/>} />}>
        <Route path="/" element={<ContentLayout><AdminDashboard /></ContentLayout>} />
        <Route path="/skills" element={<ContentLayout><SkillsPage /></ContentLayout>} />

        <Route path="/settings" element={<ContentLayout><SettingsPage /></ContentLayout>} />
        <Route path="*" element={<Navigate to={'/admin'} />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
