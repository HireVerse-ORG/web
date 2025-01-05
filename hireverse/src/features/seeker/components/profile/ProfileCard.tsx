import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import colors from "@core/theme/colors";
import { AssistantPhotoTwoTone, GroupOutlined, LocationOnOutlined } from "@mui/icons-material";
import EditButton from "@core/components/ui/EditButton";
import { useState } from "react";

type ProfileCardProps = {
    editable?: boolean;
};

const ProfileCard = ({ editable }: ProfileCardProps) => {
    const [avatarLoading, setAvatarLoading] = useState(true);
    const profilePicSize = 120;

    const handleAvatarLoaded = () => setAvatarLoading(false)
    const handleAvatarLoadingError = () => setAvatarLoading(false)

    return (
        <Box
            sx={{
                border: `1px solid ${colors.borderColour}`,
                overflow: "hidden",
                position: "relative"
            }}
        >
            {/* Cover Pic */}
            <Box sx={{ color: "white", position: "relative" }}>
                <Box sx={{
                    background: "linear-gradient(90deg,#6A5ACD,  #4640DE)",
                    height: 140,
                }} />

                {editable && <EditButton color="white" sx={{
                    position: "absolute",
                    top: 12,
                    right: 12
                }}
                />}
            </Box>
            {/* Profile info */}
            <Box sx={{ padding: 3, position: "relative" }}>
                {/* Profile Picture */}
                {avatarLoading && (
                    <Skeleton variant="circular" sx={{
                        width: profilePicSize,
                        height: profilePicSize,
                        border: '10px solid white',
                        position: 'absolute',
                        top: '-60px',
                        left: 20,
                    }}
                    />
                )}
                
                <Avatar
                    alt="John Doe"
                    src="https://placehold.co/400x400"
                    sx={{
                        width: profilePicSize,
                        height: profilePicSize,
                        border: '10px solid white',
                        position: 'absolute',
                        top: '-60px',
                        left: 20,
                    }}

                    slotProps={{
                        img: {
                            onLoad: handleAvatarLoaded,
                            onError: handleAvatarLoadingError
                        }
                    }}
                />

                {/* User info */}
                <Box sx={{
                    marginLeft: `${profilePicSize + 20}px`,
                }}>
                    <Typography variant="h5" fontWeight="bold">
                        John Doe
                    </Typography>

                    <Typography variant="subtitle1">
                        Product Designer at Twitter
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5
                        }}
                    >
                        <LocationOnOutlined sx={{ mr: 0.5, fontSize: 18 }} />
                        <Typography variant="body2">
                            Hyderabad, India
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 1,
                            color: "lightgray"
                        }}
                    >
                        <GroupOutlined sx={{ mr: 0.5, fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: "bold" }}>
                            789 followers
                        </Typography>
                    </Box>


                    {/* Opportunity Button */}
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: "#EEFAF7",
                            color: "#56CDAD",
                            textTransform: "none",
                            borderRadius: "10px",
                            pointerEvents: "none",
                            wordWrap: "none"
                        }}
                        startIcon={<AssistantPhotoTwoTone />}
                    >
                        Open for Opportunities
                    </Button>

                </Box>
                {/* Edit Profile Button */}
                {editable && <EditButton color="primary" sx={{
                    position: "absolute",
                    top: 12,
                    right: 12
                }}
                />}
            </Box>
        </Box>
    );
};

export default ProfileCard;
