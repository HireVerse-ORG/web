import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import colors from "@core/theme/colors";
import { AssistantPhotoTwoTone, GroupOutlined, LocationOnOutlined } from "@mui/icons-material";
import EditButton from "@core/components/ui/EditButton";
import { useState } from "react";
import { getSeekerProfile } from "@core/api/seeker/profileApi";
import { SeekerProfile } from "@core/types/seeker.interface";
import useGet from "@core/hooks/useGet";
import CustomDialog from "@core/components/ui/CustomDialog";
import SeekerProfileForm from "../forms/SeekerProfileForm";
import SeekerCoverPicForm from "../forms/SeekerCoverPicForm";
import { DEAFULT_SEEKER_PROFILE_IMAGE_URL } from "@core/utils/constants";

type ProfileCardProps = {
    editable?: boolean;
    username?: string;
};

const ProfileCard = ({ editable, username }: ProfileCardProps) => {
    const { data: profile, setData: seProfile, loading, error, refetch } = useGet<SeekerProfile>(() => getSeekerProfile(username));
    const [modelOpen, setModelOpen] = useState(false);
    const [coverPhotoModalOpen, setCoverPhotoModalOpen] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(true);

    const profilePicSize = 120;

    const handleAvatarLoaded = () => setAvatarLoading(false);
    const handleAvatarLoadingError = () => setAvatarLoading(false);

    const handleProfileEdit = () => setModelOpen(true)
    const handleModelClose = () => setModelOpen(false)
    const handleProfileFormSucces = (profile: SeekerProfile) => {
        handleModelClose();
        seProfile(profile);
    }

    const handleCoverPicEdit = () => setCoverPhotoModalOpen(true)
    const handleCoverModelClose = () => setCoverPhotoModalOpen(false)
    const handleCoverPicFormSucces = (newCoverImage: string) => {
        if (profile) {
            const updatedProfile = { ...profile, coverImage: newCoverImage };
            seProfile(updatedProfile); 
        }
        handleCoverModelClose();
    };

    if (loading) {
        return (
            <Box
                sx={{
                    border: `1px solid ${colors.borderColour}`,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Skeleton variant="rectangular" height={140} />
                <Box sx={{ padding: 3 }}>
                    <Skeleton variant="circular" width={profilePicSize} height={profilePicSize} sx={{ mt: -8 }} />
                    <Skeleton variant="text" sx={{ mt: 2, width: "50%" }} />
                    <Skeleton variant="text" sx={{ width: "30%" }} />
                    <Skeleton variant="text" sx={{ mt: 2, width: "70%" }} />
                </Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                    border: `1px solid ${colors.borderColour}`,
                    borderRadius: 2,
                    textAlign: "center",
                    gap: 2,
                }}
            >
                <Avatar
                    src="https://placehold.co/100x100?text=Error"
                    alt="Error Illustration"
                    sx={{ width: 80, height: 80 }}
                />
                <Typography variant="h6" color="error" fontWeight="bold">
                    Oops! Something went wrong.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    We couldn't load the profile.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={refetch}
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                border: `1px solid ${colors.borderColour}`,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Cover Pic */}
            <Box sx={{ color: "white", position: "relative" }}>
                <Box
                    sx={{
                        background: profile?.coverImage ? `url(${profile.coverImage}) no-repeat center center/cover` : "linear-gradient(90deg,#6A5ACD,  #4640DE)",
                        height: 140,
                    }}
                />
                {editable && (
                    <EditButton
                        onClick={handleCoverPicEdit}
                        color="white"
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                        }}
                    />
                )}
            </Box>

            {/* Profile info */}
            <Box sx={{ padding: 3, position: "relative" }}>
                {/* Profile Picture */}
                {avatarLoading && (
                    <Skeleton
                        variant="circular"
                        sx={{
                            width: profilePicSize,
                            height: profilePicSize,
                            border: "10px solid white",
                            position: "absolute",
                            top: "-60px",
                            left: 20,
                        }}
                    />
                )}
                <Avatar
                    alt={profile?.profileName || "User Picture"}
                    src={profile?.image || DEAFULT_SEEKER_PROFILE_IMAGE_URL}
                    sx={{
                        width: profilePicSize,
                        height: profilePicSize,
                        border: "10px solid white",
                        position: "absolute",
                        top: "-60px",
                        left: 20,
                    }}
                    slotProps={{
                        img: {
                            onLoad: handleAvatarLoaded,
                            onError: handleAvatarLoadingError,
                        },
                    }}
                />
                {/* User info */}
                <Box
                    sx={{
                        marginLeft: `${profilePicSize + 20}px`,
                    }}
                >
                    {profile?.profileName && (
                        <Typography variant="h5" fontWeight="bold">
                            {profile.profileName}
                        </Typography>
                    )}

                    {profile?.title && (
                        <Typography variant="subtitle1">
                            {profile.title}
                        </Typography>
                    )}

                    {profile?.location && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 0.5,
                            }}
                        >
                            <LocationOnOutlined sx={{ mr: 0.5, fontSize: 18 }} />
                            <Typography variant="body2">
                                {profile.location.city}{","}{profile.location.country}
                            </Typography>
                        </Box>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 1,
                            color: "lightgray",
                        }}
                    >
                        <GroupOutlined sx={{ mr: 0.5, fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: "bold" }}>
                            {"1000 followers"}
                        </Typography>
                    </Box>

                    {/* Opportunity Button */}
                    {profile?.isOpenToWork && (
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: "#EEFAF7",
                                color: "#56CDAD",
                                textTransform: "none",
                                borderRadius: "10px",
                                pointerEvents: "none",
                                wordWrap: "none",
                            }}
                            startIcon={<AssistantPhotoTwoTone />}
                        >
                            Open for Opportunities
                        </Button>
                    )}
                </Box>

                {/* Edit Profile Button */}
                {editable && (
                    <EditButton
                        onClick={handleProfileEdit}
                        color="primary"
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                        }}
                    />
                )}
            </Box>

            {/* form */}
            {editable && (
                <>
                    <CustomDialog open={modelOpen} onClose={handleModelClose}>
                        <SeekerProfileForm profile={profile} onSucces={handleProfileFormSucces} />
                    </CustomDialog>
                    <CustomDialog open={coverPhotoModalOpen} onClose={handleCoverModelClose}>
                        <SeekerCoverPicForm onSucces={handleCoverPicFormSucces} initialImageUrl={profile?.coverImage} />
                    </CustomDialog>
                </>
            )}
        </Box>
    );
};

export default ProfileCard;
