import { Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import useAppDispatch from "@core/hooks/useDispatch";
import { clearCredential } from "@core/store/authslice";

const LogoutButton = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(clearCredential())
    }

    return (
        <Button
            onClick={() => handleLogout()}
            variant="text"
            color="error"
            endIcon={<ExitToApp />}
            sx={{
                textTransform: "none",
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
