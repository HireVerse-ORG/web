import { Box, Typography, Avatar } from "@mui/material";

interface AccountInfoProps {
    name: string;
    email: string;
    profilePicture: string;
}

const AccountInfo = ({ name, email, profilePicture }: AccountInfoProps) => (
    <Box display="flex" alignItems="center">
        <Avatar src={profilePicture} alt={name} />
        <Box ml={2}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2" color="text.secondary">{email}</Typography>
        </Box>
    </Box>
);

export default AccountInfo;
