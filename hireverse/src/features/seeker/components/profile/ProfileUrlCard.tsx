import { getSeekerUsername } from "@core/api/seeker/profileApi";
import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { Language } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useGet from "@core/hooks/useGet";

type ProfileUrlCardProps = {
    editable?: boolean;
    username?: string;
};

const ProfileUrlCard = ({ editable, username }: ProfileUrlCardProps) => {
    const { data: profileUsername, loading, error } = useGet<string>(() => getSeekerUsername(username));

    const [profileUrl, setProfileUrl] = useState<string>("");

    const baseUrl = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        if (profileUsername) {
            setProfileUrl(`${baseUrl}/${profileUsername}`);
        }
    }, [profileUsername, baseUrl]);

    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Profile URL
                </Typography>
                {editable && <EditButton color="primary" />}
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Skeleton variant="text" width="60%" height={24} />
                </Box>
            ) : error ? (
                <Typography variant="body2" color="error">
                    Failed to load profile URL.
                </Typography>
            ) : (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Language sx={{ mr: 0.5, fontSize: 18 }} />
                    <Typography
                        variant="body2"
                        component={Link}
                        to={profileUrl}
                        sx={{
                            textDecoration: "none",
                            color: "text.primary",
                            "&:hover": {
                                color: "primary.main",
                                textDecoration: "underline",
                            },
                        }}
                    >
                        {profileUrl}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ProfileUrlCard;
