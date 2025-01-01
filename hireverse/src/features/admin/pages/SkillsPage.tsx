import CustomDialog from "@core/components/ui/CustomDialog";
import SearchBox from "@core/components/ui/SearchBox";
import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, Chip, CircularProgress, debounce, IconButton, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import useSkills from "../hooks/useSkill";
import SkillForm from "../components/forms/SkillForm";
import { ISkill } from "@core/types/skill.interface";
import { deactivateSkill, restoreSkill } from "@core/api/admin/skillapi";
import { toast } from "sonner";

const SkillsPage = () => {
    const [modelOpen, setModelOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editableSkill, setEditableSkill] = useState<ISkill | null>(null);
    const { skills, setSkills, totalSkills, totalPages, loading, refetch } = useSkills(currentPage, 10, searchQuery);

    const handleSearch = debounce((value: string) => {
        setCurrentPage(1);
        setSearchQuery(value);
    }, 500);

    const handleEdit = (row: ISkill) => {
        setEditableSkill(row)
        setModelOpen(true);
    };

    const handleSkillStatus = async (row: ISkill) => {
        try {
            if(row.isActive){
                await deactivateSkill(row.id);
            } else {
                await restoreSkill(row.id);
            }
            toast.success(`Skill ${row.isActive ? "deactivated" : "restored"} successfully`);
            setSkills((prevSkills) => prevSkills.map((skill) => (skill.id === row.id ? { ...skill, isActive: !skill.isActive } : skill)));
        } catch (error: any) {
            toast.error(error.message || "Failed to delete skill");
        }
    };

    const handleAdd = async () => {
        setModelOpen(true);
    };

    const handleCloseModel = () => {
        setModelOpen(false);
        setEditableSkill(null);
    };

    const handleFormSuccess = () => {
        handleCloseModel();
        refetch();
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const columns: TableColumn[] = [
        { id: "name", label: "Skill Name", minWidth: 170 },
        { id: "createdAt", label: "Created", minWidth: 100 },
        {
            id: "isActive",
            label: "Status",
            minWidth: 100,
            align: "center",
            render: (row: ISkill) => (
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
            render: (row: ISkill) => (
                <>
                    {row.isActive ? (
                        <Box display="flex" gap={1} justifyContent="center">
                            <IconButton size="small" onClick={() => handleEdit(row)} color="primary">
                                <Edit />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleSkillStatus(row)} color="error">
                                <Delete />
                            </IconButton>
                        </Box>
                    ) : (
                        <Button
                            size="small"
                            variant="contained"
                            color="inherit"
                            sx={{ minWidth: "90px" }}
                            onClick={() => handleSkillStatus(row)}
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
                alignItems={"center"}
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
                    Total Skills: {loading ? <CircularProgress size={20} /> : totalSkills}
                </Typography>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                    <SearchBox placeholder="Search skills" onSearch={handleSearch} />
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
                        Add Skill
                    </Button>
                </Box>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : skills.length === 0 ? (
                <Typography variant="h6" fontWeight={"bold"} sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem", marginTop: 4, padding: 2 }}>
                    No Skills found
                </Typography>
            ) : (
                <>
                    <TableComponent columns={columns} rows={skills} />
                    <Box display="flex" justifyContent="center" py={3}>
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                    </Box>
                </>
            )}

            <CustomDialog open={modelOpen} onClose={handleCloseModel} title="Add/Edit Skill">
                <SkillForm skill={editableSkill} onSuccess={handleFormSuccess} />
            </CustomDialog>
        </>
    );
};

export default SkillsPage;