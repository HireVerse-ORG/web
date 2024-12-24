import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

type DashboardLayoutProps = {
    Sidebar: React.ReactNode;
}

const DashboardLayout = ({ Sidebar }: DashboardLayoutProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box display="flex">
            {/* Sidebar */}
            {!isMobile && (
                <>
                    {Sidebar}
                </>
            )}


            {/* Main Content */}
            <Container
                component="main"
                sx={{
                    backgroundColor: "white",
                    flexGrow: 1,
                    height: "100vh",
                    overflowY: "hidden",
                    padding: '0 !important'
                }}
            >
                <Outlet />
            </Container>
        </Box>
    );
};

export default DashboardLayout;
