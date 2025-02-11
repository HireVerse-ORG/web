import { SidebarSection } from "@core/types/sidebar.interface";
import { ChatOutlined, CorporateFareOutlined, CurrencyExchangeOutlined, DescriptionOutlined, HomeOutlined, PersonOutline, ScheduleOutlined, SearchOutlined, SettingsOutlined } from "@mui/icons-material";

export const SeekerSidebarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/seeker" },
            { 
                name: "Messages", 
                icon: <ChatOutlined />, 
                path: "/seeker/messages",
            },
            { name: "Browse Companies", icon: <CorporateFareOutlined />, path: "/seeker/browse-companies" },
            { name: "Find Jobs", icon: <SearchOutlined />, path: "/seeker/find-jobs" },
            { name: "My Applications", icon: <DescriptionOutlined />, path: "/seeker/my-applications" },
            { name: "My Schedules", icon: <ScheduleOutlined />, path: "/seeker/schedules" },
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
