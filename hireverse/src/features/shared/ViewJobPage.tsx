import { useParams } from "react-router-dom";
import SecondaryLightLayout from "@core/components/layouts/SecondoryLightLayout";
import JobTitleCard from "@core/components/ui/job/JobTitleCard";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { Box, Typography, Skeleton } from "@mui/material";
import useGet from "@core/hooks/useGet";
import { getJob } from "@core/api/shared/jobsApi";
import { useEffect, useState } from "react";
import useAppSelector from "@core/hooks/useSelector";
import { toast } from "sonner";
import CustomDialog from "@core/components/ui/CustomDialog";
import JobApplicationForm from "../seeker/components/forms/JobApplicationForm";
import JobDescriptionSection from "@core/components/ui/job/JobDescriptionSection ";
import JobDetailsSection from "@core/components/ui/job/JobDetailsSection";

const ViewJobPage = () => {
    const { id: jobId } = useParams<{ id: string }>();

    const { data: job, loading, error } = useGet(() => getJob(jobId || ""));
    const user = useAppSelector(state => state.auth.user);

    const [categories, setCategories] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [modelOpen, setModelOpen] = useState(false);

    useEffect(() => {
        if (job) {
            const mappedCategories = job.categories.filter(ct => typeof ct != "string")
                .map(ct => ct.name);

            const mappedSkills = job.skills.filter(sk => typeof sk != "string")
                .map(sk => sk.name);

            setCategories(mappedCategories);
            setSkills(mappedSkills);
        }
    }, [job])

    const handleApply = () => {
        if (!user) {
            toast.error("Please login to apply")
            return;
        }

        setModelOpen(true)
    }

    const handleModelClose = () => setModelOpen(false)

    if (loading) {
        return (
            <SecondaryLightLayout
                header={
                    <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="80%" />
                    </Box>
                }
            >
                {/* Loading skeleton for job details */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, width: "100%", maxWidth: "1000px", mx: "auto", mt: 3 }}>
                    <Box flex={2}>
                        <Skeleton variant="rectangular" width="100%" height={300} />
                        <Skeleton variant="text" width="50%" sx={{ mt: 2 }} />
                        <Skeleton variant="text" width="60%" />
                    </Box>
                    <Box flex={1}>
                        <Skeleton variant="text" width="70%" sx={{ mb: 2 }} />
                        <Skeleton variant="text" width="50%" />
                    </Box>
                </Box>
            </SecondaryLightLayout>
        );
    }

    // Handle error state
    if (error || !job) {
        return (
            <SecondaryLightLayout
                header={
                    <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
                        <Typography variant="h5" color="error">
                            Failed to load job details.
                        </Typography>
                    </Box>
                }
            >
                <Box sx={{ padding: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                        Something went wrong while fetching the job details. Please try again later.
                    </Typography>
                </Box>
            </SecondaryLightLayout>
        );
    }

    return (
        <>
            <SecondaryLightLayout
                header={
                    <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
                        <JobTitleCard data={{
                            jobid: job.id,
                            jobtitle: job.title,
                            companyName: job.companyProfile?.name || "",
                            companyLocation: job.companyProfile?.location || { city: "", country: "" },
                            companyLogoUrl: job.companyProfile?.image || DEAFULT_COMPANY_IMAGE_URL,
                        }} onApply={handleApply} />
                    </Box>
                }
            >
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, width: "100%", maxWidth: "1000px", mx: "auto", mt: 3 }}>
                    {/* Left Section */}
                    <Box flex={2}>
                        <JobDescriptionSection job={{
                            description: job.description,
                            responsibilities: job.responsibilities,
                            whoYouAre: job.whoYouAre,
                            niceToHaves: job.niceToHaves
                        }} />
                    </Box>

                    {/* Right Section */}
                    <Box flex={1}>
                        <JobDetailsSection job={{
                            salaryRange: job.salaryRange || [],
                            createdAt: job.createdAt,
                        }} categories={categories} skills={skills} />
                    </Box>
                </Box>
            </SecondaryLightLayout>
            <CustomDialog open={modelOpen} onClose={handleModelClose}>
                <JobApplicationForm jobData={{
                    jobid: job.id,
                    jobTitle: job.title,
                    companyName: job.companyProfile?.name || "",
                    companyLogo: job.companyProfile?.image || DEAFULT_COMPANY_IMAGE_URL,
                    location: job.companyProfile?.location || { city: "", country: "" }
                }} />
            </CustomDialog>
        </>
    );
};

export default ViewJobPage;
