import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

type DashboardLayoutProps = {
    Sidebar: React.ReactNode;
}

const DashboardLayout = ({Sidebar}: DashboardLayoutProps) => {
    return (
        <Box display="flex">
            {/* Sidebar */}
            {Sidebar}
            

            {/* Main Content Area */}
            <Container
                component="main"
                sx={{
                    backgroundColor: "white",
                    flexGrow: 1,
                    padding: 3,
                    marginLeft: 2,
                    minHeight: "100vh",
                }}
            >
                <Outlet /> 
            </Container>
        </Box>
    );
};

export default DashboardLayout;
