import Sidebar from "@core/components/ui/Sidebar";
import { Box, Button, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MenuButton from "@core/components/ui/MenuButton";
import { Link } from "react-router-dom";
import { CompanySidebarSections } from "./SidebarSections";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { Add } from "@mui/icons-material";

const Header = () => {
    const { companyProfile } = useCompanyContext();
    const [openMenu, setOpenMenu] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
                px: {xs: 2, sm: 3}
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
                                fontSize: {xs: "14px", sm: "16px"},
                                fontWeight: 600,
                                color: "text.primary",
                            }}
                        >
                            {companyProfile?.name || "Company"}
                        </Typography>
                    </Box>
                </Box>

                {/* Link Button */}
                {companyProfile?.status === "verified" && (
                    <Button
                        variant="contained"
                        component={Link}
                        to="/company/post-job"
                        startIcon={<Add />}
                        sx={{textWrap: "nowrap"}}
                    >
                        Post a job
                    </Button>
                )}

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
