import { Box } from "@mui/material";

const ProfileCreationSteppperLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>{children}</Box>
    );
}

export default ProfileCreationSteppperLayout;
