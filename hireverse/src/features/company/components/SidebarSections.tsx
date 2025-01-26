import { SidebarSection } from "@core/types/sidebar.interface"
import { BusinessOutlined, CurrencyExchangeOutlined, GroupsOutlined, HomeOutlined, SettingsOutlined, WorkOutline } from "@mui/icons-material"

export const CompanySidebarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/company" },
            { name: "Company Profile", icon: <BusinessOutlined />, path: "/company/profile" },
            { name: "All applicants", icon: <GroupsOutlined />, path: "/company/applicants" },
            { name: "My Jobs", icon: <WorkOutline />, path: "/company/jobs" },
            {name: "Pricing Plan", icon: <CurrencyExchangeOutlined />, path: "/company/pricing-plans" },
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
