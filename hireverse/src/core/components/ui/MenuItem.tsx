import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export type MenuItemProps = {
    name: string;
    icon: React.ReactNode;
    path: string;
    onItemClick?: () => void;
};

const MenuItem = ({ name, icon, path, onItemClick }: MenuItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <ListItem
            onClick={() => onItemClick?.()}
            component={Link}
            to={path}
            sx={{
                paddingBlock: 0,
                position: "relative",
                "&:before": {
                    content: '""',
                    width: 4,
                    height: "70%",
                    backgroundColor: isActive ? "primary.main" : "transparent",
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    transition: "background-color 0.3s", 
                },
                "&:hover:before": {
                    backgroundColor: "primary.main", 
                },
            }}
        >
            <ListItemButton
                sx={{
                    color: isActive ? "primary.main" : "text.disabled",
                    backgroundColor: isActive ? "secondary.light" : "transparent",
                    transition: "background-color 0.3s", 
                    "&:hover": {
                        backgroundColor: "secondary.light",
                        color: "primary.main",
                    },
                }}
            >
                {icon}
                <ListItemText
                    primary={name}
                    sx={{
                        marginLeft: 1,
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default MenuItem;
