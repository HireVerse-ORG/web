import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchJobs } from "@core/api/shared/jobsApi";
import JobSearchBox from "@core/components/ui/SearchWithLocation";
import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import JobCard from "../../core/components/ui/job/JobCard";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { IJobWithCompanyProfile } from "@core/types/job.interface";
import JobFilters, { IJobFilter } from "@core/components/ui/job/JobFilters";
import SecondaryLightLayout from "@core/components/layouts/SecondoryLightLayout";
import useAppSelector from "@core/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import CustomDialog from "@core/components/ui/CustomDialog";
import JobApplicationForm from "../seeker/components/forms/JobApplicationForm";

type FindJobsProps = {
    viewJobBaseUrl: string;
};

const FindJobsPage = ({ viewJobBaseUrl }: FindJobsProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState<IJobWithCompanyProfile[]>([]);
    const [selectedJob, setSelectedJob] = useState<IJobWithCompanyProfile | null>(null);
    const [modelOpen, setModelOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalJobs, setTotaljobs] = useState(0);
    const [location, setLocation] = useState({ location: "", city: "", country: "" });
    const [jobTitle, setJobTitle] = useState("");
    const [filters, setFilters] = useState<IJobFilter>({
        employmentTypes: [],
        categories: [],
        salaryRange: "",
    });

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const keyword = searchParams.get("keyword") || "";
        const location = searchParams.get("location") || "";
        const city = searchParams.get("city") || "";
        const country = searchParams.get("country") || "";

        setJobTitle(keyword);
        setLocation({ location, city, country });
    }, [searchParams]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await searchJobs({ keyword: jobTitle, ...location, ...filters, page, limit: 10 });
            setJobs(response.data);
            setTotalPages(response.totalPages);
            setTotaljobs(response.total);
        } catch (error) {
            setJobs([]);
            setTotalPages(1);
            setTotaljobs(0);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (title: string, loc: { location: string; city: string; country: string }) => {
        setJobTitle(title);
        setLocation(loc);
        setFilters({
            employmentTypes: [],
            categories: [],
            salaryRange: "",
        });
        setPage(1);

        // Update query params in the URL
        setSearchParams({ keyword: title, location: loc.location, city: loc.city, country: loc.country });
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setSearchParams({ ...searchParams, page: value.toString() });
    };

    const handleJobFilterChange = (filter: IJobFilter) => {
        setFilters(filter);
        setPage(1);
    };

    useEffect(() => {
        if (jobTitle || location.location || location.city || location.country) {
            fetchJobs();
        }
    }, [page, jobTitle, location, filters.employmentTypes, filters.categories, filters.salaryRange]);

    const handleCardClick = (jobId: string) => {
        navigate(`${viewJobBaseUrl}/${jobId}`);
    };

    const handleModelClose = () => {
        setModelOpen(false);
        setSelectedJob(null);
    }

    return (
        <>
            <SecondaryLightLayout
                header={
                    <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
                        <JobSearchBox onSearch={handleSearch} searching={loading} placeholder="Job title or keyword" />
                    </Box>
                }
            >
                <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    {/* Filters */}
                    <Box
                        sx={{
                            display: { xs: "flex", sm: "block" },
                            justifyContent: "end",
                            width: "100%",
                            maxWidth: { xs: "auto", sm: "250px" },
                        }}
                    >
                        <JobFilters onApplyFilters={handleJobFilterChange} jobKeyword={jobTitle} />
                    </Box>

                    {/* Jobs List */}
                    <Box flexGrow={1}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                All Jobs
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Showing {totalJobs} {totalJobs === 1 ? "result" : "results"}
                            </Typography>
                        </Box>

                        {/* Show Skeleton Loading while Fetching Jobs */}
                        {loading ? (
                            <Stack spacing={2}>
                                {[...Array(5)].map((_, index) => (
                                    <Skeleton variant="rectangular" width="100%" height={120} key={index} />
                                ))}
                            </Stack>
                        ) : (
                            <>
                                {/* Show Jobs if Available */}
                                {jobs.length > 0 &&
                                    jobs.map((job) => (
                                        <Box mb={1} key={job.id}>
                                            <JobCard
                                                job={{
                                                    id: job.id,
                                                    title: job.title,
                                                    categories: job.categories
                                                        .filter((skill) => typeof skill !== "string")
                                                        .map((cat) => cat.name),
                                                    employmentType: job.employmentTypes,
                                                }}
                                                company={{
                                                    imageUrl: job.companyProfile?.image || DEAFULT_COMPANY_IMAGE_URL,
                                                    name: job.companyProfile?.name || "",
                                                    location: job.companyProfile?.location || { city: "", country: "" },
                                                }}
                                                onApply={() => {
                                                    setSelectedJob(job);
                                                    setModelOpen(true);
                                                }}
                                                canApply={user ? true : false}
                                                onCardClick={handleCardClick}
                                            />
                                        </Box>
                                    ))}
                            </>
                        )}

                        {/* Pagination */}
                        {jobs.length > 0 && (
                            <Box display="flex" justifyContent="center" py={3}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    sx={{ mt: 3 }}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            </SecondaryLightLayout>

            <CustomDialog open={modelOpen} onClose={handleModelClose}>
                {selectedJob && (
                    <JobApplicationForm jobData={{
                        jobid: selectedJob.id,
                        jobTitle: selectedJob.title,
                        companyName: selectedJob.companyProfile?.name || "",
                        companyLogo: selectedJob.companyProfile?.image || DEAFULT_COMPANY_IMAGE_URL,
                        location: selectedJob.companyProfile?.location || {city: "", country: ""}
                    }}/>
                )}
            </CustomDialog>
        </>
    );
};

export default FindJobsPage;
