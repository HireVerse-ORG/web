import Sidebar from "@core/components/ui/Sidebar";
import { Box, Button, Container, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MenuButton from "@core/components/ui/MenuButton";
import { Link, useLocation } from "react-router-dom";
import { SeekerSidebarSections } from "./SidebarSection";
import { HomeOutlined } from "@mui/icons-material";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    const pathTitles: Record<string, string> = {
        "/seeker": "Dashboard",
        "/seeker/find-jobs": "Find Jobs",
        "/seeker/profile": "My Profile",
        "/seeker/pricing-plans": "Pricing Plans",
        "/seeker/settings": "Settings",
    };

    const currentTitle = pathTitles[location.pathname] || " ";

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <Box
            sx={{
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Container sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 3
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
            </Container>

            {isMobile && (
                <Drawer anchor="left" open={openMenu} onClose={toggleMenu}>
                    <Sidebar sections={SeekerSidebarSections} onMenuItemClick={toggleMenu} />
                </Drawer>
            )}
        </Box>
    );
};

export default Header;
