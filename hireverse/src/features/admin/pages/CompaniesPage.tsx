import { useState } from "react";
import useBlockStatus from "../hooks/useBlockStatus";
import { Box, Button, Chip, CircularProgress, debounce, Pagination, Tab, Tabs, Typography } from "@mui/material";
import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import SearchBox from "@core/components/ui/SearchBox";
import useCompany from "../hooks/useCompany";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import useRequestStatus from "../hooks/useRequestStatus";

const CompaniesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tabValue, setTabValue] = useState("all");


    const { rows, setRows, totalUsers, totalPages, loading } = useCompany(currentPage, searchQuery, tabValue);
    const { disabledRows, toggleBlockStatus } = useBlockStatus();
    const { disabledRows: requestDiabledRows, handleRequest } = useRequestStatus();

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
            id: "profile",
            label: "Profile",
            minWidth: 170,
            render: (row: any) => {
                if (row.profileData) {
                    return (
                        <Box display="flex" alignItems="center" gap={1}
                            component={"a"} href={`/company-view/${row.profileData.companyId}`} target="_blank"
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                            }}>
                            <img
                                src={row.profileData.image || DEAFULT_COMPANY_IMAGE_URL}
                                alt={row.profileData.name}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                            <Typography
                                style={{
                                    color: "inherit",
                                    fontSize: "14px"
                                }}
                            >
                                {row.profileData.name}
                            </Typography>
                        </Box>
                    );
                } else {
                    return (
                        <Typography
                            variant="body2"
                            style={{ color: "gray", fontStyle: "italic" }}
                        >
                            No Profile
                        </Typography>
                    );
                }
            },
        },
        { id: "email", label: "Email", minWidth: 100 },
        { id: "joined", label: "Joined On", minWidth: 100 },
        {
            id: "status",
            label: "Status",
            minWidth: 100,
            align: "center",
            render: (row: any) => (
                <Chip
                    label={row.status}
                    color={row.status === "Active" ? "success" : "error"}
                    variant="outlined"
                />
            ),
        },
        {
            id: "actions",
            label: "Actions",
            minWidth: 150,
            align: "center",
            render: (row: any) => {
                if (tabValue === "all") {
                    return (
                        <Button
                            size="small"
                            variant="contained"
                            color={row.status === "Active" ? "error" : "inherit"}
                            sx={{ minWidth: "90px" }}
                            onClick={() =>
                                toggleBlockStatus(row.id, row.status === "Blocked", (id: string, isBlocked: boolean) => {
                                    setRows((prevRows) =>
                                        prevRows.map((row) =>
                                            row.id === id
                                                ? { ...row, status: isBlocked ? "Active" : "Blocked" }
                                                : row
                                        )
                                    );
                                })
                            }
                            disabled={disabledRows.includes(row.id)}
                        >
                            {row.status === "Active" ? "Block" : "Unblock"}
                        </Button>
                    );
                } else if (tabValue === "requested") {
                    return (
                        <Box display="flex" gap={1} justifyContent="center">
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() =>
                                    handleRequest(row.profileData.companyId, "accept", () => {
                                        const currentRowId = row.id;
                                        setRows((prevRows) => prevRows.filter((row) => row.id !== currentRowId));
                                    })
                                }
                                disabled={requestDiabledRows.includes(row.id)}
                            >
                                Accept
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() =>
                                    handleRequest(row.profileData.companyId, "reject", () => {
                                        const currentRowId = row.id;
                                        setRows((prevRows) => prevRows.filter((row) => row.id !== currentRowId));
                                    })
                                }
                                disabled={requestDiabledRows.includes(row.id)}
                            >
                                Reject
                            </Button>
                        </Box>
                    );
                } else if (tabValue === "rejected") {
                    return (
                        <Typography
                            variant="body2"
                            style={{ color: "gray", fontStyle: "italic" }}
                        >
                            No actions available
                        </Typography>
                    );
                } else {
                    return null;
                }
            },
        },
    ];


    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ paddingBlock: 2, mb: 2, backgroundColor: "white", position: "sticky", top: 0, zIndex: 1 }}
            >
                <Typography variant="h6" fontWeight={"bold"}>
                    Total Companies: {loading ? <CircularProgress size={20} /> : totalUsers}
                </Typography>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                    <SearchBox placeholder="Search companies" onSearch={handleSearch} />
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
                <Tab label="Requests" value="requested" />
                <Tab label="Rejected" value="rejected" />
            </Tabs>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "50vh" }}>
                    <CircularProgress />
                </Box>
            ) : rows.length > 0 ? (
                <>
                    <TableComponent columns={columns} rows={rows} />
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                    </Box>
                </>
            ) : (
                <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem", marginTop: 4, padding: 2 }}
                >
                    No Companies found
                </Typography>
            )}
        </>
    );
};

export default CompaniesPage;
