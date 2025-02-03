import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAppSelector from "@core/hooks/useSelector";
import { getUserDashboardPath } from "@core/utils/helper";

const NotFoundPage = () => {
    const user = useAppSelector(state => state.auth.user);
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            textAlign="center"
            p={3}
        >
            <Box
                component="img"
                src="/images/404.svg"
                alt="404 Not Found"
                width={{ xs: "100%", sm: "50%", md: "30%" }}
            />
            <Typography variant="body2" color="textSecondary" mt={1} mb={3} sx={{maxWidth: "500px"}}>
                The page you are looking for might have been removed or is temporarily unavailable.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(user ? getUserDashboardPath(user.role) : "/")}
            >
                {user ? "Go to Dashboard" : "Go to Home"}
            </Button>
        </Box>
    );
};

export default NotFoundPage;
