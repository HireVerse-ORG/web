import { closeJob, listMyJobs, retryJobPosting } from "@core/api/company/jobApi";
import SearchBox from "@core/components/ui/SearchBox";
import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import { useCompanySubscription } from "@core/contexts/CompanySubscriptionContext";
import useGet from "@core/hooks/useGet";
import { IJob } from "@core/types/job.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { dateFormatter } from "@core/utils/helper";
import { Box, Chip, CircularProgress, debounce, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import JobActionMenu from "../components/JobActionMenu";

const MyJobsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { data, loading, refetch } = useGet<IPaginationResponse<IJob> | null>(() => listMyJobs(currentPage, 10, searchQuery));
    const [jobs, setJobs] = useState<IJob[]>([]);

    const { jobPostLimitExceeded } = useCompanySubscription();
    
    const navigate = useNavigate();


    useEffect(() => {
        data && setJobs(data.data);
    }, [data]);

    useEffect(() => {
        data && refetch();
    }, [currentPage, searchQuery])

    const handleSearch = debounce((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 500);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleRepost = async (id: string) => {
        if (jobPostLimitExceeded) {
            toast.warning("You Job post limit finished")
            return;
        }
        try {
            await retryJobPosting(id);
            setJobs(jobs.map(job => job.id === id ? { ...job, status: "pending" } : job));
        } catch (error: any) {
            toast.error(error.message || "Failed to repost job");
        }
    };

    const handleClose = async (id: string) => {
        try {
            await closeJob(id);
            setJobs(jobs.map(job => job.id === id ? { ...job, status: "closed" } : job));
        } catch (error: any) {
            toast.error(error.message || "Failed to close job");
        }
    };

    const columns: TableColumn[] = [
        {
            id: "title",
            label: "Role",
            minWidth: 170,
            render: (row: IJob) => (
                <Link to={`/company/job/${row.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {row.title}
                </Link>
            )
        },
        {
            id: "isClosed",
            label: "Status",
            minWidth: 100,
            render: (row: IJob) => (
                <>
                    {row.status === "pending" && (
                        <Chip
                            label="Pending"
                            color="warning"
                            variant="outlined"
                        />
                    )}
                    {row.status === "live" && (
                        <Chip
                            label="Live"
                            color="success"
                            variant="outlined"
                        />
                    )}
                    {row.status === "failed" && (
                        <Chip
                            label="Failed"
                            color="error"
                            variant="outlined"
                        />
                    )}
                    {row.status === "closed" && (
                        <Chip
                            label="Closed"
                            color="error"
                            variant="outlined"
                        />
                    )}
                </>

            )
        },
        {
            id: "createdAt",
            label: "Date Posted",
            minWidth: 100,
            render: (row: IJob) => (
                <>{dateFormatter(row.createdAt)}</>
            )
        },
        {
            id: "employmentTypes",
            label: "Job Type",
            minWidth: 100,
            render: (row: IJob) => (
                <>
                    {row.employmentTypes.join(", ")}
                </>
            )
        },
        {
            id: "actions",
            label: "Actions",
            minWidth: 150,
            render: (row: IJob) => (
                <>
                    {row.status === "closed" ? (
                        <Typography
                            variant="body2"
                            style={{ color: "gray", fontStyle: "italic" }}
                        >
                            Closed
                        </Typography>
                    ) : (
                        <JobActionMenu
                            row={row}
                            handleRepost={handleRepost}
                            handleClose={handleClose}
                            navigate={navigate}
                        />
                    )}
                </>


            ),
        }
    ];

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexWrap={{ xs: "wrap-reverse", sm: "nowrap" }}
                alignItems={{ xs: "start", sm: "center" }}
                gap={2}
                sx={{
                    paddingBlock: 2,
                    mb: 2,
                    backgroundColor: "white",
                    position: "sticky",
                    top: 0,
                    zIndex: 1
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight={"bold"}>Job Listing</Typography>
                    <Typography variant="body2" color="textSecondary">Here is your recent jobs</Typography>
                </Box>

                <Box display={"flex"}
                    justifyContent={"space-between"}
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "center" }}
                    gap={2}>
                    <SearchBox placeholder="Search jobs" onSearch={handleSearch} />
                </Box>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : jobs.length === 0 ? (
                <Typography variant="h6" fontWeight={"bold"} sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem", marginTop: 4, padding: 2 }}>
                    No jobs found
                </Typography>
            ) : (
                <>
                    <TableComponent columns={columns} rows={jobs} />
                    <Box display="flex" justifyContent="center" py={3}>
                        <Pagination count={data?.totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                    </Box>
                </>
            )}
        </>
    );
}

export default MyJobsPage;
