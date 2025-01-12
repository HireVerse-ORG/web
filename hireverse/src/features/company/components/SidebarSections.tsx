import { SidebarSection } from "@core/types/sidebar.interface"
import { BusinessOutlined, HomeOutlined, SettingsOutlined } from "@mui/icons-material"

export const CompanySidebarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/company" },
            { name: "Company Profile", icon: <BusinessOutlined />, path: "/company/profile" },
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
