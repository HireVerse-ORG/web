import { Clear } from "@mui/icons-material";
import { IconButton, SxProps, Theme } from "@mui/material";

type DeleteButtonProps = {
    color?: "white" | "primary" | "black";
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    sx?: SxProps<Theme>;
};

const DeleteButton = ({ color = "primary", onClick, sx }: DeleteButtonProps) => {
    const colorMap = {
        white: "#FFFFFF",
        primary: "primary.main",
        black: "#000000",
    };

    return (
        <IconButton
            onClick={onClick}
            sx={{
                cursor: "pointer",
                color: colorMap[color],
                backgroundColor: color === "white" ? "rgba(0, 0, 0, 0.1)" : "transparent",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                ...sx, 
            }}
        >
            <Clear />
        </IconButton>
    );
};

export default DeleteButton;
