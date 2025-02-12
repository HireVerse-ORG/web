import { SidebarSection } from "@core/types/sidebar.interface"
import { BusinessOutlined, ChatOutlined, CurrencyExchangeOutlined, GroupsOutlined, HomeOutlined, ScheduleOutlined, SettingsOutlined, WorkOutline } from "@mui/icons-material"

export const CompanySidebarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/company" },
            { name: "Messages", icon: <ChatOutlined />, path: "/company/messages" },
            { name: "All applicants", icon: <GroupsOutlined />, path: "/company/applicants" },
            { name: "My Jobs", icon: <WorkOutline />, path: "/company/jobs" },
            { name: "My Schedules", icon: <ScheduleOutlined />, path: "/company/schedules" },
            { name: "Company Profile", icon: <BusinessOutlined />, path: "/company/profile" },
            { name: "Pricing Plan", icon: <CurrencyExchangeOutlined />, path: "/company/pricing-plans" },
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
