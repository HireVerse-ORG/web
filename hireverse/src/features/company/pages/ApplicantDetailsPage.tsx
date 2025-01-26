import GoBackTitleButton from "@core/components/ui/GoBackTitleButton";
import { Box } from "@mui/material";

const ApplicantDetailsPage = () => {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <GoBackTitleButton title={"Applicant Details"} />
            </Box>
        </Box>
    );
}

export default ApplicantDetailsPage;
