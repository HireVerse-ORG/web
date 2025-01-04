import { SidebarSection } from "@core/types/sidebar.interface";
import { HomeOutlined, PersonOutline, SettingsOutlined } from "@mui/icons-material";

export const SeekerSidebarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/seeker" },
            { name: "My Profile", icon: <PersonOutline />, path: "/seeker/profile" },
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
