import { Box, Button, Badge, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SeekerSidebarSections } from "./SidebarSection";
import { HomeOutlined, NotificationsOutlined } from "@mui/icons-material";
import { useNotificationSocket } from "@core/contexts/NotificationContext";
import MenuButton from "@core/components/ui/MenuButton";
import Sidebar from "@core/components/ui/Sidebar";
import { shakeAnimation } from "@core/utils/ui";
import { getMyNotificationsCount } from "@core/api/shared/notificationsApi";
import { getFolloweRequestCount } from "@core/api/shared/followersApi";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    const {socket, notificationCount, setNotificationCount} = useNotificationSocket();

    useEffect(() => {
        const fetchInitialNotificationCount = async () => {
            try {
                const [notificationData, followRequestCount] = await Promise.allSettled([
                    getMyNotificationsCount({ status: "sent", type: "inApp" }),
                    getFolloweRequestCount()
                ]);
    
                let notificationCount = 0;
    
                if (notificationData.status === "fulfilled") {
                    notificationCount += notificationData.value.count;
                } 
    
                if (followRequestCount.status === "fulfilled") {
                    notificationCount += followRequestCount.value.count;
                } 
    
                setNotificationCount(notificationCount);
            } catch (error) {
                console.error("Unexpected error in fetchInitialNotificationCount", error);
            }
        };
    
        fetchInitialNotificationCount();
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleNewNotification = (_: { message: string }) => {
            setNotificationCount((prevCount) => prevCount + 1);

            setIsAnimating(true);

            setTimeout(() => {
                setIsAnimating(false);
            }, 1000);
        };

        socket.on("new-notification", handleNewNotification);

        return () => {
            socket.off("new-notification");
        };
    }, [socket]);

    const pathTitles: Record<string, string> = {
        "/seeker": "Dashboard",
        "/seeker/messages": "Messages",
        "/seeker/my-applications": "My Applications",
        "/seeker/schedules": "My Schedules",
        "/seeker/find-jobs": "Find Jobs",
        "/seeker/browse-companies": "Discover Companies",
        "/seeker/view-job/:id": "Job Description",
        "/seeker/my-application/:id": "Application Details",
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
                        <Link to={'/seeker/dashboard'} style={{display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none"}}>
                            <HomeOutlined color="primary" />
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
                            badgeContent={notificationCount}
                            color="error"
                            overlap="circular"
                            sx={{
                                "& .MuiBadge-dot": {
                                    backgroundColor: "red",
                                },
                            }}
                        >
                            <NotificationsOutlined
                                color="primary"
                                sx={{
                                    animation: isAnimating ? `${shakeAnimation} 1s ease-in-out 3`: 'none',
                                }}
                            />
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
