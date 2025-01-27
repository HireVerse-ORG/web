import SearchBox from "@core/components/ui/SearchBox";
import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import { Box, Chip, Button, Typography, CircularProgress, Pagination, debounce } from "@mui/material";
import { useState } from "react";
import useUser from "../hooks/useUser";
import useBlockStatus from "../hooks/useBlockStatus";


const SeekersPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { rows, setRows, totalUsers, totalPages, loading } = useUser("seeker", currentPage, searchQuery);
    const { disabledRows, toggleBlockStatus } = useBlockStatus();

    const handleSearch = debounce((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 500);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const columns: TableColumn[] = [
        { id: "name", label: "Full Name", minWidth: 170 },
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
            render: (row: any) => (
                <Button
                    size="small"
                    variant="contained"
                    color={row.status === "Active" ? "error" : "inherit"}
                    sx={{ minWidth: '90px' }}
                    onClick={() => toggleBlockStatus(row.id, row.status === "Blocked", (id: string, isBlocked: boolean) => {
                        setRows((prevRows) =>
                            prevRows.map((row) =>
                                row.id === id
                                    ? { ...row, status: isBlocked ? "Active" : "Blocked" }
                                    : row
                            )
                        );
                    })}
                    disabled={disabledRows.includes(row.id)}
                >
                    {row.status === "Active" ? "Block" : "Unblock"}
                </Button>
            ),
        },
    ];

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"}
                flexWrap={{ xs: "wrap-reverse", sm: "nowrap" }}
                alignItems={{ xs: "start", sm: "center" }}
                gap={2}
                sx={{ paddingBlock: 2, mb: 2, backgroundColor: "white", position: "sticky", top: 0, zIndex: 1 }}>
                <Typography variant="h6" fontWeight={"bold"}>
                    Total Seekers: {loading ? <CircularProgress size={20} /> : totalUsers}
                </Typography>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                    <SearchBox placeholder="Search seekers" onSearch={handleSearch} />
                </Box>
            </Box>

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
                <Typography variant="h6" fontWeight={"bold"} sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem", marginTop: 4, padding: 2 }}>
                    No Seekers found
                </Typography>
            )}
        </>
    );
};

export default SeekersPage;
