import CustomDialog from "@core/components/ui/CustomDialog";
import SearchBox from "@core/components/ui/SearchBox";
import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, Chip, CircularProgress, debounce, IconButton, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { IJobCategory } from "@core/types/jobCategory.interface";
import useJobCategory from "../hooks/useJobCategory";
import { deactivateJobCategory, restoreJobCategory } from "@core/api/admin/jobCategoryApi";
import JobCategoryForm from "../components/forms/JobCategoryForm";

const JobCategoryPage = () => {
    const [modelOpen, setModelOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editableJobCategory, setEditableJobCategory] = useState<IJobCategory | null>(null);
    const { jobCategories, setJobCategories, totalJobCategory, totalPages, loading, refetch } = useJobCategory(currentPage, 10, searchQuery);

    const handleSearch = debounce((value: string) => {
        setCurrentPage(1);
        setSearchQuery(value);
    }, 500);

    const handleEdit = (row: IJobCategory) => {
        setEditableJobCategory(row)
        setModelOpen(true);
    };

    const handleJobCategoriestatus = async (row: IJobCategory) => {
        try {
            if(row.isActive){
                await deactivateJobCategory(row.id);
            } else {
                await restoreJobCategory(row.id);
            }
            toast.success(`Category ${row.isActive ? "deactivated" : "restored"} successfully`);
            setJobCategories((prevJobCategories) => prevJobCategories.map((category) => (category.id === row.id ? { ...category, isActive: !category.isActive } : category)));
        } catch (error: any) {
            toast.error(error.message || "Failed to delete category");
        }
    };

    const handleAdd = async () => {
        setModelOpen(true);
    };

    const handleCloseModel = () => {
        setModelOpen(false);
        setEditableJobCategory(null);
    };

    const handleFormSuccess = () => {
        handleCloseModel();
        refetch();
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const columns: TableColumn[] = [
        { id: "name", label: "Category", minWidth: 170 },
        { id: "createdAt", label: "Created", minWidth: 100 },
        {
            id: "isActive",
            label: "Status",
            minWidth: 100,
            align: "center",
            render: (row: IJobCategory) => (
                <Chip
                    label={row.isActive ? "Active" : "Inactive"}
                    color={row.isActive ? "success" : "error"}
                    variant="outlined"
                />
            ),
        },
        {
            id: "actions",
            label: "Actions",
            minWidth: 150,
            align: "center",
            render: (row: IJobCategory) => (
                <>
                    {row.isActive ? (
                        <Box display="flex" gap={1} justifyContent="center">
                            <IconButton size="small" onClick={() => handleEdit(row)} color="primary">
                                <Edit />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleJobCategoriestatus(row)} color="error">
                                <Delete />
                            </IconButton>
                        </Box>
                    ) : (
                        <Button
                            size="small"
                            variant="contained"
                            color="inherit"
                            sx={{ minWidth: "90px" }}
                            onClick={() => handleJobCategoriestatus(row)}
                        >
                            Restore
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={{xs: "start", sm: "center"}}
                flexWrap={{xs: "wrap-reverse", sm: "nowrap"}}
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
                <Typography variant="h6" fontWeight={"bold"}>
                    Total Job Categories: {loading ? <CircularProgress size={20} /> : totalJobCategory}
                </Typography>

                <Box display={"flex"} 
                    justifyContent={"space-between"} 
                    flexDirection={{xs: "column", sm: "row"}}
                    alignItems={{sm: "center"}}
                    gap={2}>
                    <SearchBox placeholder="Search categories" onSearch={handleSearch}/>
                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        startIcon={<Add />}
                        sx={{
                            whiteSpace: "nowrap",
                            minWidth: "auto",
                            paddingX: 2,
                        }}
                    >
                        Add Category
                    </Button>
                </Box>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : jobCategories.length === 0 ? (
                <Typography variant="h6" fontWeight={"bold"} sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem", marginTop: 4, padding: 2 }}>
                    No Job Categories found
                </Typography>
            ) : (
                <>
                    <TableComponent columns={columns} rows={jobCategories} />
                    <Box display="flex" justifyContent="center" py={3}>
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                    </Box>
                </>
            )}

            <CustomDialog open={modelOpen} onClose={handleCloseModel} title="Add/Edit Category">
                <JobCategoryForm category={editableJobCategory} onSuccess={handleFormSuccess} />
            </CustomDialog>
        </>
    );
};

export default JobCategoryPage;