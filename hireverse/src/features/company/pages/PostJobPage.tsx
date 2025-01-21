import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import JobStepper from "../components/JobStepper";
import { useNavigate } from "react-router-dom";

const PostJobPage = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Box display="flex" alignItems="center" sx={{ mb: { xs: 0.5, md: 1 } }}>
                <IconButton onClick={() => navigate(-1)} aria-label="Go back">
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" fontWeight={600}>
                    Post a Job
                </Typography>
            </Box>

            {/* Stepper Component */}
            <JobStepper />
        </Box>
    );
}

export default PostJobPage;