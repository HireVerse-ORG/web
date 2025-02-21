import { listMyTransactions } from '@core/api/shared/transactionApi';
import TableComponent, { TableColumn } from '@core/components/ui/TableComponent';
import useGet from '@core/hooks/useGet';
import { IPaginationResponse } from '@core/types/pagination.interface';
import { ITransaction } from '@core/types/transaction.interface';
import { dateFormatter } from '@core/utils/helper';
import { getTransactionStatusDetails } from '@core/utils/ui';
import { Box, capitalize, Chip, CircularProgress, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const MyTransactions = () => {
    const [page, setPage] = useState(1);
    const { data, loading } = useGet<IPaginationResponse<ITransaction>>(() => listMyTransactions(page, 10), [page]);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
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
        setPage(page);
    };


    const columns: TableColumn[] = [
        {
            id: "id",
            label: "Transaction ID",
            minWidth: 100,
        },
        {
            id: "createdAt",
            label: "Paid on",
            minWidth: 100,
            render: (row: ITransaction) => (
                <>
                    {dateFormatter(row.createdAt)}
                </>
            )
        },
        {
            id: "metadata",
            label: "Plan",
            minWidth: 100,
            render: (row: ITransaction) => (
                <>
                    {`${row.metadata?.subscription_details?.plan ? capitalize(row.metadata.subscription_details.plan) : "N/A"}`}
                </>
            )
        },
        {
            id: "amount",
            label: "Amount",
            minWidth: 100,
            render: (row: ITransaction) => (
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
            render: (row: ITransaction) => {
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
                    <Typography variant='subtitle1' fontWeight={"bold"}>
                        Subscription History
                    </Typography>
                    <Typography variant='body2'>
                        Total Transactions: {loading ? <CircularProgress size={20} /> : totalTransactions}
                    </Typography>
                </Box>
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
                            <Pagination count={totalPage} page={page} onChange={handlePageChange} color="primary" />
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

export default MyTransactions;
