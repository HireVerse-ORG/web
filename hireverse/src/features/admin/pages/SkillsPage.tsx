import { listSkills } from "@core/api/admin/skillapi";
import SearchBox from "@core/components/ui/SearchBox";
import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";

const SkillsPage = () => {

    useEffect(() => {

    }, [])

    const handleSearch = (value: string) => {
        console.log("Search value:", value);
    };

    const handleEdit = (row: any) => {
        console.log("Edit row:", row);
    };

    const handleDelete = (row: any) => {
        console.log("Delete row:", row);
    };

    const handleAdd = async() => {
        try {
            const res = await listSkills();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    } 

    const columns: TableColumn[] = [
        { id: "name", label: "Skill Name", minWidth: 170 },
        { id: "category", label: "Category", minWidth: 100 },
        { id: "level", label: "Level", minWidth: 100, align: "right" },
        {
            id: "actions",
            label: "Actions",
            minWidth: 150,
            align: "center",
            render: (row: any) => (
                <Box display="flex" gap={1} justifyContent="center">
                    <IconButton onClick={() => handleEdit(row)} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row)} color="error">
                        <Delete />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const rows = [
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "React", category: "Frontend", level: "Intermediate" },
        { name: "Node.js", category: "Backend", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
        { name: "JavaScript", category: "Programming", level: "Expert" },
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
                    Total Skills: 190
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
            <TableComponent
                columns={columns}
                rows={rows}
            />
        </>
    );
};

export default SkillsPage;
