import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/Sidebar";
import { SidebarSection } from "@core/types/sidebar.interface";
import { HomeOutlined, SettingsOutlined, StarBorderOutlined } from "@mui/icons-material";
import SkillsPage from "./pages/SkillsPage";

const sections: SidebarSection[] = [
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
  const accountInfo = {
    name: "Admin",
    email: "admin@gmail.com",
    profilePicture: "example.png"
  }

  return (
    <Routes>
      <Route element={<DashboardLayout Sidebar={<Sidebar accountInfo={accountInfo} sections={sections}/>} />}>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="*" element={<Navigate to={'/admin'} />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
