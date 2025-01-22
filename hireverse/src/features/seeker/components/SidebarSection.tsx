import { SidebarSection } from "@core/types/sidebar.interface";
import { CurrencyExchangeOutlined, HomeOutlined, PersonOutline, SearchOutlined, SettingsOutlined } from "@mui/icons-material";

export const SeekerSidebarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/seeker" },
            { name: "Find Jobs", icon: <SearchOutlined />, path: "/seeker/find-jobs" },
            { name: "My Profile", icon: <PersonOutline />, path: "/seeker/profile" },
            { name: "Pricing Plan", icon: <CurrencyExchangeOutlined />, path: "/seeker/pricing-plans" },
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
