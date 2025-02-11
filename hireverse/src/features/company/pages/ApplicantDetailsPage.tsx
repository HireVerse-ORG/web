import GoBackTitleButton from "@core/components/ui/GoBackTitleButton";
import { Box, Skeleton, Typography } from "@mui/material";
import ApplicantInfoCard from "../components/applicants/ApplicantInfoCard";
import ApplicantDetailTabCard from "../components/applicants/ApplicantDetailTabCard";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationDetailsforCompany } from "@core/api/company/jobApplicationApi";
import useGet from "@core/hooks/useGet";
import { IJobApplicationWithSeekerProfile, JobApplicationStatus } from "@core/types/job.application.interface";
import { useEffect, useState } from "react";

const ApplicantDetailsPage = () => {
    const { id: applicationId } = useParams<{ id: string }>();
    const { data: application,
        loading: applicationLoading,
        error: applicationError } = useGet<IJobApplicationWithSeekerProfile>(() => getApplicationDetailsforCompany(applicationId || ""));

    const [status, setStatus] = useState<JobApplicationStatus | null>(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (application) {
            setStatus(application.status);
        }
    }, [application])

    const handleStatusChange = (status: JobApplicationStatus) => {
        setStatus(status);
    }

    if (applicationLoading) {
        return (
            <Box pb={5}>
                <GoBackTitleButton title={"Applicant Details"} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                    }}
                >
                    <Skeleton variant="rectangular" height={400} sx={{ flex: 1 }} />
                    <Skeleton variant="rectangular" height={400} sx={{ flex: 2 }} />
                </Box>
            </Box >
        );
    }

    if (!application || applicationError) {
        // Error handling
        return (
            <Box pb={5}>
                <GoBackTitleButton title={"Applicant Details"} />
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography color="error" variant="h6">
                        {applicationError || "Failed to load applicant details. Please try again later."}
                    </Typography>
                </Box>
            </Box>
        );
    }


    return (
        <Box pb={5}>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <GoBackTitleButton title={"Applicant Details"} />
            </Box>

            {/* details */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2
            }}>
                {/* left */}
                <Box sx={{ minWidth: "350px" }}>
                    <ApplicantInfoCard
                        data={{
                            applicantUserId: application.profile?.userId || "",
                            profilePicture: application.profile?.image || "",
                            fullName: application.fullName,
                            currentPosition: application.profile?.title || "",
                            appliedJob: application.jobRole,
                            appliedDate: application.createdAt,
                            stage: status || application.status,
                            email: application.email,
                            phone: application.phone || ""
                        }}
                        onViewProfileClick={() => {
                            if (application.profile) {
                                navigate(`/${application.profile.profileUsername}`)
                            }
                        }}
                    />
                </Box>

                {/* right */}
                <Box flexGrow={1}>
                    <ApplicantDetailTabCard
                        data={{
                            applicationId: application.id,
                            applicantId: application.userId,
                            jobId: application.jobId,
                            resume: application.resume,
                            ResumeComment: application?.comment,
                            hiringProgress: application.status,
                            coverLetter: application.coverLetter,
                            declinedReason: application.declinedReason || ""
                        }}

                        onStatusChanged={handleStatusChange}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default ApplicantDetailsPage;
