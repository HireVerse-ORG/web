import { SidebarSection } from "@core/types/sidebar.interface"
import { HomeOutlined, SettingsOutlined } from "@mui/icons-material"

export const CompanySidebarSections: SidebarSection[] = [
    {
        items: [
            { name: "Dashboard", icon: <HomeOutlined />, path: "/company" },
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
