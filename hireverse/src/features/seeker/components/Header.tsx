import Sidebar from "@core/components/ui/Sidebar";
import { Badge, Box, Button, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MenuButton from "@core/components/ui/MenuButton";
import { Link, useLocation } from "react-router-dom";
import { SeekerSidebarSections } from "./SidebarSection";
import { HomeOutlined, NotificationsOutlined } from "@mui/icons-material";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    const pathTitles: Record<string, string> = {
        "/seeker": "Dashboard",
        "/seeker/messages": "Messages",
        "/seeker/my-applications": "My Applications",
        "/seeker/find-jobs": "Find Jobs",
        "/seeker/view-job/:id": "Job Description",
        "/seeker/profile": "My Profile",
        "/seeker/pricing-plans": "Pricing Plans",
        "/seeker/notifications": "Notifications",
        "/seeker/settings": "Settings",
    };

    const resolveTitle = (pathname: string) => {
        for (const [path, title] of Object.entries(pathTitles)) {
            const pathRegex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
            if (pathRegex.test(pathname)) {
                return title;
            }
        }
        return " ";
    };

    const currentTitle = resolveTitle(location.pathname);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <Box
            sx={{
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 3,
                px: { xs: 2, sm: 3 }
            }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {isMobile && <MenuButton onToggle={toggleMenu} />}
                    <Typography variant={isMobile ? "h6" : "h5"} fontWeight={"500"}>
                        {currentTitle}
                    </Typography>
                </Box>

                {/* Link Button */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}>
                    {isMobile ? (
                        <Link to={'/admin/dashboard'}>
                            <HomeOutlined />
                        </Link>
                    ) : (

                        <Button
                            variant="outlined"
                            component={Link}
                            to="/"
                        >
                            Back to homepage
                        </Button>
                    )}

                    {/* Notifications Button with Count */}
                    <Link to="/seeker/notifications">
                        <Badge
                            badgeContent={1}
                            color="error"
                            overlap="circular"
                            sx={{
                                "& .MuiBadge-dot": {
                                    backgroundColor: "red",
                                },
                            }}
                        >
                            <NotificationsOutlined />
                        </Badge>
                    </Link>
                </Box>
            </Box>

            {isMobile && (
                <Drawer anchor="left" open={openMenu} onClose={toggleMenu}>
                    <Sidebar sections={SeekerSidebarSections} onMenuItemClick={toggleMenu} />
                </Drawer>
            )}
        </Box>
    );
};

export default Header;
