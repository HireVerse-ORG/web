import LogoutButton from "@core/components/ui/LogoutButton";
import { Box } from "@mui/material";

const SettingsPage = () => {
    return (
        <Box sx={{
            height: "100%",
            position: "relative"
        }}>

            {/* Footer */}
            <Box sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                width: "100%",
                position: "absolute",
                bottom: 0,
                paddingBlock: 1 
            }}>
                <LogoutButton />
            </Box>
        </Box>
    );
}

export default SettingsPage;
