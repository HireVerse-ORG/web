import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { IJob } from "@core/types/job.interface";

const JobActionMenu = ({ row, handleRepost, handleClose, navigate }: { 
    row: IJob; 
    handleRepost: (id: string) => void; 
    handleClose: (id: string) => void; 
    navigate: (url: string, state?: object) => void; 
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {row.status === "failed" && (
                    <MenuItem onClick={() => {
                        handleRepost(row.id);
                        handleMenuClose();
                    }}>
                        Retry
                    </MenuItem>
                )}
                {row.status === "live" && (
                    <MenuItem onClick={() => {
                        handleClose(row.id);
                        handleMenuClose();
                    }}>
                        Close
                    </MenuItem>
                )}
                {row.status !== "closed" && (
                    <MenuItem onClick={() => {
                        navigate(`/company/edit-job`, { state: { job: row } });
                        handleMenuClose();
                    }}>
                        Edit
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};

export default JobActionMenu;
