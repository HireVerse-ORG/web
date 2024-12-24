import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

interface MenuButtonProps {
    onToggle: () => void;
}

const MenuButton = ({ onToggle }: MenuButtonProps) => {
    return (
        <IconButton onClick={onToggle}>
            <MenuIcon />
        </IconButton>
    );
};

export default MenuButton;
