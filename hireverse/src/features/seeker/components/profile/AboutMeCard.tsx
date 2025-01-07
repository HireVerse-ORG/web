import { getSeekerBio } from "@core/api/seeker/profileApi";
import EditButton from "@core/components/ui/EditButton";
import useGet from "@core/hooks/useGet";
import colors from "@core/theme/colors";
import { Box, Typography, Skeleton } from "@mui/material";

type AboutMeCardProps = {
    editable?: boolean;
    username?: string;
};

const AboutMeCard = ({ editable, username }: AboutMeCardProps) => {
    const { data: bio, loading, error } = useGet<string>(() => getSeekerBio(username));

    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}`, display: !editable && !bio ? "none" : "block"  }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    About Me
                </Typography>
                {editable && <EditButton color="primary" />}
            </Box>

            {loading ? (
                <Box sx={{ mt: 2 }}>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="90%" height={24} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="85%" height={24} sx={{ mt: 1 }} />
                </Box>
            ) : error ? (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                    Failed to load the about me section.
                </Typography>
            ) : editable && (
                <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
                    {bio || "Update you about me.."}
                </Typography>
            )}
        </Box>
    );
};

export default AboutMeCard;
