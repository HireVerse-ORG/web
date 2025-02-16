import { listTransactions } from "@core/api/admin/transactionApi";
import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import useGet from "@core/hooks/useGet";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { ITransactionWithProfile } from "@core/types/transaction.interface";
import { DEAFULT_SEEKER_PROFILE_IMAGE_URL } from "@core/utils/constants";
import { dateFormatter } from "@core/utils/helper";
import { getTransactionStatusDetails } from "@core/utils/ui";
import { Box, Chip, CircularProgress, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const TransactionPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, loading } = useGet<IPaginationResponse<ITransactionWithProfile>>(() => listTransactions(currentPage, 10), [currentPage]);

    const [transactions, setTransactions] = useState<ITransactionWithProfile[]>([]);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        if (data) {
            setTransactions(data.data);
            setTotalTransactions(data.total);
            setTotalPage(data.totalPages);
        }
    }, [data])

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const columns: TableColumn[] = [
        {
            id: "userId",
            label: "User",
            minWidth: 170,
            render: (row: ITransactionWithProfile) => {
                if (row.profile) {
                    return (
                        <Box display="flex" alignItems="center" gap={1}
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
                                src={row.profile.image || DEAFULT_SEEKER_PROFILE_IMAGE_URL}
                                alt={row.profile.name}
                                style={{
                                    width: 40,
                                    height: 40,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                            <Typography
                                style={{
                                    color: "inherit",
                                    fontSize: "14px"
                                }}
                            >
                                {row.profile?.name || ""}
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
        {
            id: "id",
            label: "Transaction ID",
            minWidth: 100,
        },
        {
            id: "createdAt",
            label: "Date",
            minWidth: 100,
            render: (row: ITransactionWithProfile) => (
                <>
                    {dateFormatter(row.createdAt)}
                </>
            )
        },
        {
            id: "amount",
            label: "Amount",
            minWidth: 100,
            render: (row: ITransactionWithProfile) => (
                <>
                    {`${row.currency.toUpperCase()}: ${row.amount}`}
                </>
            )
        },
        {
            id: "status",
            label: "Status",
            minWidth: 100,
            align: "center",
            render: (row: ITransactionWithProfile) => {
                const status = getTransactionStatusDetails(row.status);

                return (
                    <Chip
                        label={status.label}
                        color={status.color}
                        variant="outlined"
                    />
                )
            },
        },
    ]

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
                <Typography variant="h6" fontWeight={"bold"}>
                    Total Transactions: {loading ? <CircularProgress size={20} /> : totalTransactions}
                </Typography>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "50vh" }}>
                    <CircularProgress />
                </Box>
            ) : transactions.length > 0 ? (
                <>
                    <TableComponent columns={columns} rows={transactions} />
                    {totalPage > 0 && (
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="primary" />
                        </Box>
                    )}
                </>
            ) : (
                <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem", marginTop: 4, padding: 2 }}
                >
                    No Transactions found
                </Typography>
            )}
        </>
    );
}

export default TransactionPage;
