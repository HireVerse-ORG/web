import { Box } from "@mui/material";
import Loader from "./Loader";

const PageLoader = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "white",
                zIndex: 1300, 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none", 
            }}
        >
            <Loader />
        </Box>
    );
};

export default PageLoader;
