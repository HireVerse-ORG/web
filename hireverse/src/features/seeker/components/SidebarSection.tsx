import { SidebarSection } from "@core/types/sidebar.interface";
import { ChatOutlined, CorporateFareOutlined, CurrencyExchangeOutlined, DescriptionOutlined, HomeOutlined, PersonOutline, SearchOutlined, SettingsOutlined } from "@mui/icons-material";

export const SeekerSidebarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/seeker" },
            { name: "Messages", icon: <ChatOutlined />, path: "/seeker/messages" },
            { name: "My Applications", icon: <DescriptionOutlined />, path: "/seeker/my-applications" },
            { name: "Find Jobs", icon: <SearchOutlined />, path: "/seeker/find-jobs" },
            { name: "Browse Companies", icon: <CorporateFareOutlined />, path: "/seeker/browse-companies" },
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
