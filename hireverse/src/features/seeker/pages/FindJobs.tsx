import { useState, useEffect } from "react";
import { searchJobs } from "@core/api/shared/jobsApi";
import JobSearchBox from "@core/components/ui/JobSearchBox";
import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import JobCard from "../../../core/components/ui/JobCard";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { IJobWithCompanyProfile } from "@core/types/job.interface";
import colors from "@core/theme/colors";

const FindJobs = () => {
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState<IJobWithCompanyProfile[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalJobs, setTotaljobs] = useState(0);
    const [location, setLocation] = useState({ location: "", city: "", country: "" });
    const [jobTitle, setJobTitle] = useState("");

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await searchJobs({ keyword: jobTitle, ...location, page, limit: 10 });
            setJobs(response.data);
            setTotalPages(response.totalPages);
            setTotaljobs(response.total);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (title: string, loc: { location: string; city: string; country: string }) => {
        setJobTitle(title);
        setLocation(loc);
        setPage(1);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (jobTitle || location.location || location.city || location.country) {
            fetchJobs();
        }
    }, [page, jobTitle, location]);

    return (
        <Box>
            {/* Job Search Box */}
            <Box sx={{ pb: 3, mb: 2, borderBottom: `1px solid ${colors.borderColour}` }}>
                <JobSearchBox onSearch={handleSearch} searching={loading} />
            </Box>

            <Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        All Jobs
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Showing {totalJobs} {totalJobs === 1 ? 'result' : 'results'}
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
                        {jobs.length > 0 && (
                            jobs.map((job) => (
                                <Box mb={1}>
                                    <JobCard
                                        key={job.id}
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
                                        onApply={(jobId) => console.log("Applied to job:", jobId)}
                                        canApply
                                    />
                                </Box>
                            ))
                        )}
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
    );
};

export default FindJobs;
