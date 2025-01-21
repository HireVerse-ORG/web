import { Box, IconButton, Typography } from "@mui/material";
import JobStepper from "../components/JobStepper";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { IJob } from "@core/types/job.interface";
import { useEffect } from "react";
import { toast } from "sonner";

const EditJobPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const job = location.state?.job as IJob | undefined;

    useEffect(() => {
        if (!job) {
            toast.error("No job data found. Redirecting to job listings...");
            navigate("/company/jobs", { replace: true });
        }
    }, [job, navigate]);

    if (!job) {
        return null; 
    }

    return (
        <Box>
            <Box display="flex" alignItems="center" sx={{ mb: { xs: 0.5, md: 1 } }}>
                <IconButton onClick={() => navigate(-1)} aria-label="Go back">
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" fontWeight={600}>
                    Edit Job
                </Typography>
            </Box>

            {/* Stepper Component */}
            <JobStepper job={job} />
        </Box>
    );
};

export default EditJobPage;
