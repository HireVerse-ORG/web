import { Box, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import MenuButton from "@core/components/ui/MenuButton";
import { HomeOutlined } from "@mui/icons-material";
import Sidebar from "@core/components/ui/Sidebar";
import { sections } from "../../routes";
import { getTitle } from "./helper";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const { id } = useParams();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <Box borderBottom={isMobile ? '1px solid' : 'none'} borderColor={"secondary.main"} sx={{
            padding: isMobile ? 2 : 0,
            display: isMobile ? "flex" : "block",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            {isMobile && (
                <>
                    <Box display="flex" alignItems="center" justifyContent={'center'} gap={1}>
                        <MenuButton onToggle={toggleMenu} />
                        <Typography variant="h6">{getTitle(location.pathname, id)}</Typography>
                    </Box>

                    <Link to={'/admin/dashboard'}>
                        <HomeOutlined />
                    </Link>
                </>
            )} 
            {/* Mobile Menu */}
            <Drawer
                anchor="left"
                open={openMenu}
                onClose={toggleMenu}
            >
                <Sidebar sections={sections}/>
            </Drawer>
        </Box>
    );
}

export default Header;
