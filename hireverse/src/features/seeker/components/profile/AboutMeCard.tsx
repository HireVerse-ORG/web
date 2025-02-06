import { getSeekerBio } from "@core/api/seeker/profileApi";
import CustomDialog from "@core/components/ui/CustomDialog";
import EditButton from "@core/components/ui/EditButton";
import useGet from "@core/hooks/useGet";
import colors from "@core/theme/colors";
import { Box, Typography, Skeleton } from "@mui/material";
import SeekerBioForm from "../forms/SeekerBioForm";
import { useState } from "react";
import RenderHtml from "@core/components/ui/RenderHtml";

type AboutMeCardProps = {
    editable?: boolean;
    username?: string;
};

const AboutMeCard = ({ editable, username }: AboutMeCardProps) => {
    const { data: bio, setData: setBio, loading, error } = useGet<string>(() => getSeekerBio(username), [username]);
    const [modelOpen, setModelOpen] = useState(false);

    const handleBioEdit = () => setModelOpen(true)
    const handleModelClose = () => setModelOpen(false)
    const handleBioFormSucces = (bio: string) => {
        handleModelClose();
        setBio(bio);
    }


    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}`, display: !editable && !bio ? "none" : "block" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    About Me
                </Typography>
                {editable && <EditButton onClick={handleBioEdit} color="primary" />}
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
            ) : editable && !bio ? (
                <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
                    Update you about me..
                </Typography>
            ) : bio && (
                <RenderHtml htmlContent={bio}/>
            )}

            {/* form */}
            {editable && (
                <>
                    <CustomDialog open={modelOpen} onClose={handleModelClose}>
                        <SeekerBioForm onSuccess={handleBioFormSucces} bio={bio}/>
                    </CustomDialog>
                </>
            )}
        </Box>
    );
};

export default AboutMeCard;
