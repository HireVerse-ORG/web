import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { Language } from "@mui/icons-material";
import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom";

type ProfileUrlCardProps = {
    editable?: boolean;
}

const ProfileUrlCard = ({ editable }: ProfileUrlCardProps) => {
    const baseUrl = import.meta.env.VITE_APP_URL
    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Profile URL
                </Typography>
                {editable && <EditButton color="primary" />}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2
                }}
            >

                <Language sx={{ mr: 0.5, fontSize: 18 }} />
                <Typography variant="body2" component={Link} to={`${baseUrl}/john-doe`} sx={{
                        textDecoration: "none", 
                        color: "text.primary",
                        "&:hover": {
                            color: "primary.main",
                            textDecoration: "underline"
                        }
                    }}>
                    {baseUrl}/john-doe
                </Typography>
            </Box>
        </Box>
    );
}

export default ProfileUrlCard;
