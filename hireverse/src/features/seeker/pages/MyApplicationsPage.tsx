import { getMyJobApplications, reApplyJob, withdrawJobApplication } from "@core/api/seeker/jobApplicationApi";
import SearchBox from "@core/components/ui/SearchBox";
import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import { useSeekerSubscription } from "@core/contexts/SeekerSubscriptionContext";
import useGet from "@core/hooks/useGet";
import { IJobApplicationWithCompanyProfile, JobApplicationStatus } from "@core/types/job.application.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { dateFormatter } from "@core/utils/helper";
import { getJobApplicationStatusDetails } from "@core/utils/ui";
import { Box, Button, Chip, CircularProgress, debounce, Pagination, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MyApplicationsPage = () => {
    const { jobApplicationLimitExceeded } = useSeekerSubscription();
    const [searchQuery, setSearchQuery] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [tabValue, setTabValue] = useState("all");
    const [applications, setApplications] = useState<IJobApplicationWithCompanyProfile[]>([]);

    const { data, loading, refetch } = useGet<IPaginationResponse<IJobApplicationWithCompanyProfile>>(() => getMyJobApplications({
        page: currentPage,
        limit: 10,
        query: searchQuery,
        status: tabValue === "all" ? undefined : tabValue as JobApplicationStatus
    }))

    useEffect(() => {
        if (data) {
            setApplications(data.data);
            setTotalPages(data.totalPages);
        }
    }, [data])

    useEffect(() => {
        if (data) {
            setApplications([])
            refetch();
        }
    }, [currentPage, searchQuery, tabValue])

    const handleSearch = debounce((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 500);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleTabChange = (_event: React.SyntheticEvent, value: string) => {
        setTabValue(value)
        setCurrentPage(1);
    };

    const columns: TableColumn[] = [
        {
            id: "company",
            label: "Company Profile",
            minWidth: 170,
            render: (row: IJobApplicationWithCompanyProfile) => {
                if (row.companyProfile) {
                    return (
                        <Box display="flex" alignItems="center" gap={1}
                            component={"a"} href={`/company-view/${row.companyProfile.companyId}`} target="_blank"
                            sx={{
                                color: "inherit",
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline",
                                    color: "primary.main",
                                    fontWeight: 500,
                                },
                            }}>
                            <img
                                src={row.companyProfile.image || DEAFULT_COMPANY_IMAGE_URL}
                                alt={row.companyProfile.name}
                                style={{
                                    width: 40,
                                    height: 40,
                                    objectFit: "cover",
                                }}
                            />
                            <Typography
                                style={{
                                    color: "inherit",
                                    fontSize: "14px"
                                }}
                            >
                                {row.companyProfile?.name || ""}
                            </Typography>
                        </Box>
                    );
                } else {
                    return (
                        <Typography
                            variant="body2"
                            style={{ color: "gray", fontStyle: "italic" }}
                        >
                            N/A
                        </Typography>
                    );
                }
            },
        },
        { id: "jobRole", label: "Roles", minWidth: 100 },
        {
            id: "created", label: "Date Applied", minWidth: 100, render: (row: IJobApplicationWithCompanyProfile) => (
                <>{dateFormatter(row.createdAt)}</>
            )
        },
        {
            id: "status",
            label: "Status",
            minWidth: 100,
            align: "center",
            render: (row: IJobApplicationWithCompanyProfile) => {
                const status = getJobApplicationStatusDetails(row.status);
                return (
                    <Chip
                        label={status.label}
                        color={status.color}
                        variant="outlined"
                    />
                );
            }
        },
        {
            id: "actions",
            label: "Actions",
            minWidth: 150,
            align: "center",
            render: (row: IJobApplicationWithCompanyProfile) => {
                const [loading, setLoading] = useState(false);

                const handleReapply = async () => {
                    if(jobApplicationLimitExceeded){
                        toast.warning("Your job apply limited exceeded.", {description: "Upgrade your plan and retry."})
                        return;
                    }
                    setLoading(true);
                    try {
                        await reApplyJob(row.id);
                        setApplications(applications.map((app) =>
                            app.id === row.id ? { ...app, status: "pending" } : app
                        ));
                        toast.success("Successfully reapplied for the job!");
                    } catch (error: any) {
                        toast.error(error || "Failed to reapply");
                    } finally {
                        setLoading(false);
                    }
                };

                const handleWithdraw = async () => {
                    setLoading(true);
                    try {
                        await withdrawJobApplication(row.id);
                        setApplications(applications.filter((app) => app.id !== row.id));
                        toast.success("Successfully withdrew the application!");
                    } catch (error: any) {
                        toast.error(error || "Failed to withdraw the application");
                    } finally {
                        setLoading(false);
                    }
                };

                const viewInterviewDetails = () => {
                    window.location.href = `/interview-details/${row.id}`;
                };

                const viewOfferLetter = () => {
                    window.location.href = `/offer-letter/${row.id}`;
                };

                return (
                    <>
                        {row.status === "failed" ? (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleReapply}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Reapply"}
                            </Button>
                        ) : row.status === "pending" || row.status === "applied" ? (
                            <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={handleWithdraw}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Withdraw"}
                            </Button>
                        ) : row.status === "interview" ? (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={viewInterviewDetails}
                            >
                                View Interview Details
                            </Button>
                        ) : row.status === "hired" ? (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={viewOfferLetter}
                            >
                                View Offer Letter
                            </Button>
                        ) : (
                            <Typography fontStyle={"italic"} color="textDisabled">No Actions</Typography>
                        )}
                    </>
                );
            },
        },
    ];


    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexWrap={{ xs: "wrap-reverse", sm: "nowrap" }}
                alignItems={{ xs: "start", sm: "center" }}
                gap={2}
                sx={{ paddingBlock: 2, mb: 2, backgroundColor: "white", position: "sticky", top: 0, zIndex: 1 }}
            >
                <Box>
                    <Typography variant="h6" fontWeight={"bold"}>
                        My Job Applications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Track and manage all your submitted job applications.
                    </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                    <SearchBox placeholder="Search applications" onSearch={handleSearch} />
                </Box>
            </Box>

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
                sx={{ marginBottom: 2 }}
            >
                <Tab label="All" value="all" />
                <Tab label="In Review" value="in-review" />
                <Tab label="shortlisted" value="shortlisted" />
                <Tab label="Interviewing" value="interview" />
                <Tab label="Hired" value="hired" />
                <Tab label="Withdrawn" value="withdrawn" />
            </Tabs>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "50vh" }}>
                    <CircularProgress />
                </Box>
            ) : applications.length > 0 ? (
                <>
                    <TableComponent columns={columns} rows={applications} />
                    {totalPages > 0 && (
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                        </Box>
                    )}
                </>
            ) : (
                <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem", marginTop: 4, padding: 2 }}
                >
                    No Applications found
                </Typography>
            )}
        </>
    );
};

export default MyApplicationsPage;
