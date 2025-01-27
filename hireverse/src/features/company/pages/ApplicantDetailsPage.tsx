import GoBackTitleButton from "@core/components/ui/GoBackTitleButton";
import { Box } from "@mui/material";
import ApplicantInfoCard from "../components/applicants/ApplicantInfoCard";
import ApplicantDetailTabCard from "../components/applicants/ApplicantDetailTabCard";

const ApplicantDetailsPage = () => {
    return (
        <Box pb={5}>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <GoBackTitleButton title={"Applicant Details"} />
            </Box>

            {/* details */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: {xs: "column", sm: "row"},
                gap: 2
            }}>
                {/* left */}
                <ApplicantInfoCard
                    data={{
                        profilePicture: "ddd",
                        fullName: "John Doe",
                        currentPosition: "Software Engineer",
                        appliedJob: "Frontend Developer",
                        appliedDate: new Date(),
                        stage: "interview",
                        email: "john.doe@example.com",
                        phone: "123-456-7890"
                    }}
                    onMessageClick={() => {
                        console.log("Message button clicked!");
                    }}
                    onViewProfileClick={() => {
                        console.log("Message button clicked!");
                    }}
                />

                {/* right */}
                <Box flexGrow={1}>
                    <ApplicantDetailTabCard
                        resume="https://res.cloudinary.com/hireverse/image/upload/v1737983456/suxpyz1ilbf5hugymsmi.pdf" 
                        hiringProgress={"applied"}
                    />

                </Box>
            </Box>
        </Box>
    );
}

export default ApplicantDetailsPage;
