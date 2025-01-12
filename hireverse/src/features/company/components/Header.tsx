import Sidebar from "@core/components/ui/Sidebar";
import { Box, Button, Container, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MenuButton from "@core/components/ui/MenuButton";
import { Link, useLocation } from "react-router-dom";
import { CompanySidebarSections } from "./SidebarSections";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";

const Header = () => {
    const { companyProfile } = useCompanyContext();
    const [openMenu, setOpenMenu] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

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
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                            }}
                        >
                            {companyProfile?.name || "Company"}
                        </Typography>
                    </Box>
                </Box>

                {/* Link Button */}
                {location.pathname !== "/company/settings" && companyProfile?.status === "verified" && (
                    <Button
                        variant="contained"
                        component={Link}
                        to="/"
                    >
                        Post a job
                    </Button>
                )}

            </Container>

            {isMobile && (
                <Drawer anchor="left" open={openMenu} onClose={toggleMenu}>
                    <Sidebar sections={CompanySidebarSections} onMenuItemClick={toggleMenu} />
                </Drawer>
            )}
        </Box>
    );
};

export default Header;
