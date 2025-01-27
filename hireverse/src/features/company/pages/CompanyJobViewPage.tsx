import { Box, Chip, Typography, Tab, Tabs, Skeleton, debounce } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useGet from "@core/hooks/useGet";
import { IJob } from "@core/types/job.interface";
import { getJobPostStatusDetails } from "@core/utils/ui";
import JobDetailsSection from "@core/components/ui/job/JobDetailsSection";
import { CompanyJobApplicantTableData } from "../components/applicants/ApplicantsTable";
import { listCompanyApplicants } from "@core/api/company/jobApplicationApi";
import JobDescriptionSection from "@core/components/ui/job/JobDescriptionSection ";
import ApplicantsTableContent from "../components/ApplicantsTableContent";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import GoBackTitleButton from "@core/components/ui/GoBackTitleButton";
import { getJobDetailsforCompany } from "@core/api/company/jobApi";

const CompanyJobViewPage = () => {
    const { id: jobId } = useParams<{ id: string }>();
    const { data: job, loading: jobLoading, error: jobError } = useGet<IJob>(() => getJobDetailsforCompany(jobId || ""));
    const [categories, setCategories] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [jobStatus, setJobStatus] = useState<{ label: string; color: any } | null>(null);
    const [tabValue, setTabValue] = useState("applicants");

    const [applicants, setApplicants] = useState<CompanyJobApplicantTableData[]>([]);
    const [applicantsLoading, setApplicantsLoading] = useState<boolean>(false);
    const [totalApplicants, setTotalApplicants] = useState<number>(0);
    const [totalApplicantsPage, setTotalApplicantsPage] = useState<number>(0);
    const [applicantSearchQuery, setApplicantSearchQuery] = useState("");
    const [applicantCurrentPage, setApplicantCurrentPage] = useState(1);
    const [applicantStatus, setApplicantStatus] = useState<JobApplicationStatus | "all">('all');

    useEffect(() => {
        if (job) {
            const mappedCategories = job.categories.filter(ct => typeof ct !== "string").map(ct => ct.name);
            const mappedSkills = job.skills.filter(sk => typeof sk !== "string").map(sk => sk.name);
            const status = getJobPostStatusDetails(job.status);

            setCategories(mappedCategories);
            setSkills(mappedSkills);
            setJobStatus(status);
        }
    }, [job]);

    const fetchApplicants = useCallback(async () => {
        setApplicantsLoading(true);
        try {
            const data = await listCompanyApplicants({
                jobId,
                page: applicantCurrentPage,
                limit: 10,
                query: applicantSearchQuery,
                status: applicantStatus !== "all" ? applicantStatus : undefined
            });

            const mappedApplicants: CompanyJobApplicantTableData[] = data.data.map(dt => ({
                applicationId: dt.id,
                role: dt.jobRole,
                email: dt.email,
                fullName: dt.fullName,
                hiringStage: dt.status,
                appliedDate: dt.createdAt,
            }));

            setApplicants(mappedApplicants);
            setTotalApplicants(data.total);
            setTotalApplicantsPage(data.totalPages);
        } catch (error) {
            setApplicants([]);
        } finally {
            setApplicantsLoading(false);
        }
    }, [jobId, applicantCurrentPage, applicantSearchQuery, applicantStatus]);

    useEffect(() => {
        if (tabValue === "applicants") {
            fetchApplicants();
        }
    }, [tabValue, fetchApplicants]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const handleApplicantSearch = debounce((value: string) => {
        setApplicantSearchQuery(value);
        setApplicantCurrentPage(1);
    }, 500);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setApplicantCurrentPage(page);
    };

    const handleFilterChange = (value: JobApplicationStatus | "all") => {
        setApplicantStatus(value);
        setApplicantCurrentPage(1);
    }

    if (jobLoading) {
        return (
            <Box>
                <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />
                <Skeleton variant="text" width="20%" />
            </Box>
        );
    }

    if (jobError || !job) {
        return (
            <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
                Job details not found.
            </Typography>
        );
    }

    return (
        <Box>
            {/* header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <GoBackTitleButton title={job.title} />
                {jobStatus && <Chip label={jobStatus.label} color={jobStatus.color} />}
            </Box>

            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                <Tab label="Applicants" value="applicants" />
                <Tab label="Job Details" value="job-details" />
            </Tabs>
            {tabValue === "job-details" ? (
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, maxWidth: "1000px", mx: "auto", mt: 3, pb: 3 }}>
                    <Box flex={2}>
                        <JobDescriptionSection job={{
                            description: job.description,
                            responsibilities: job.responsibilities,
                            whoYouAre: job.whoYouAre,
                            niceToHaves: job.niceToHaves,
                        }} />
                    </Box>
                    <Box flex={1}>
                        <JobDetailsSection job={{
                            salaryRange: job.salaryRange || [],
                            createdAt: job.createdAt,
                        }} categories={categories} skills={skills} />
                    </Box>
                </Box>
            ) : (
                <ApplicantsTableContent
                    applicants={applicants}
                    applicantsLoading={applicantsLoading}
                    totalApplicants={totalApplicants}
                    totalApplicantsPage={totalApplicantsPage}
                    applicantCurrentPage={applicantCurrentPage}
                    handleApplicantSearch={handleApplicantSearch}
                    handlePageChange={handlePageChange}
                    onFilterChange={handleFilterChange}
                />
            )}
        </Box>
    );
};

export default CompanyJobViewPage;
