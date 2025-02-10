import Sidebar from "@core/components/ui/Sidebar";
import { Badge, Box, Button, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import MenuButton from "@core/components/ui/MenuButton";
import { Link } from "react-router-dom";
import { CompanySidebarSections } from "./SidebarSections";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { Add, NotificationsOutlined } from "@mui/icons-material";
import { useNotificationSocket } from "@core/contexts/NotificationContext";
import { getMyNotificationsCount } from "@core/api/shared/notificationsApi";
import { shakeAnimation } from "@core/utils/ui";
import { getFolloweRequestCount } from "@core/api/shared/followersApi";

const Header = () => {
    const { companyProfile } = useCompanyContext();
    const [openMenu, setOpenMenu] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    
    const { socket, notificationCount, setNotificationCount } = useNotificationSocket();

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
                    {/* Company Logo and Name */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src={companyProfile?.image || DEAFULT_COMPANY_IMAGE_URL}
                            alt="Company Logo"
                            sx={{
                                height: 40,
                                width: 40,
                                objectFit: "contain",
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: { xs: "14px", sm: "16px" },
                                fontWeight: 600,
                                color: "text.primary",
                            }}
                        >
                            {companyProfile?.name || "Company"}
                        </Typography>
                    </Box>
                </Box>

                {/* Link Button */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}>
                    {companyProfile?.status === "verified" && (
                        <Button
                            variant="contained"
                            component={Link}
                            to="/company/post-job"
                            startIcon={<Add />}
                            sx={{ textWrap: "nowrap" }}
                        >
                            Post a job
                        </Button>
                    )}

                    <Link to="/company/notifications">
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
                                    animation: isAnimating ? `${shakeAnimation} 1s ease-in-out 3` : 'none',
                                }}
                            />
                        </Badge>
                    </Link>
                </Box>
            </Box>

            {isMobile && (
                <Drawer anchor="left" open={openMenu} onClose={toggleMenu}>
                    <Sidebar sections={CompanySidebarSections} onMenuItemClick={toggleMenu} />
                </Drawer>
            )}
        </Box>
    );
};

export default Header;
