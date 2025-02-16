import { SidebarSection } from "@core/types/sidebar.interface";
import { BusinessOutlined, CategoryOutlined, GroupsOutlined, HomeOutlined, ReceiptOutlined, SettingsOutlined, StarBorderOutlined } from "@mui/icons-material";

export const AdminSideBarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/admin" },
            { name: "Seekers", icon: <GroupsOutlined />, path: "/admin/seekers" },
            { name: "Companies", icon: <BusinessOutlined />, path: "/admin/companies" },
            { name: "Job Category", icon: <CategoryOutlined />, path: "/admin/job-category" },
            { name: "Skills", icon: <StarBorderOutlined />, path: "/admin/skills" },
            { name: "Transactions", icon: <ReceiptOutlined />, path: "/admin/transactions" },
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