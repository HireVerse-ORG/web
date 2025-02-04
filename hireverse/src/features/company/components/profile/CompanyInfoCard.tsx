import { Box, Typography, Link, Button, Skeleton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { AccountTree, Business, LocationOn, People, RemoveRedEyeOutlined } from "@mui/icons-material";
import EditButton from "@core/components/ui/EditButton";
import CompanyDetailCard from "./CompanyDetailCard";
import CustomDialog from "@core/components/ui/CustomDialog";
import { useEffect, useState } from "react";
import { ICompanyProfile } from "@core/types/company.interface";
import { dateFormatter, formatCount } from "@core/utils/helper";
import CompanyInfoForms from "../forms/CompanyInfoForms";
import useAppSelector from "@core/hooks/useSelector";
import FollowersCount from "@core/components/Follower/FollowersCount";
import FollowButton from "@core/components/Follower/FollowButton";
import MessageButton from "@core/components/chat/MessageButton";
import { getFollowersCount } from "@core/api/shared/followersApi";

type CompanyInfoCardProps = {
    mode: "read" | "edit";
    profile: ICompanyProfile;
    loading?: boolean;
};

const CompanyInfoCard = ({ mode, profile, loading }: CompanyInfoCardProps) => {
    const user = useAppSelector(state => state.auth.user);
    const [modelOpen, setModelOpen] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    useEffect(() => {
        if (!profile?.userId || !user?.id) return;

        const fetchFollowers = async () => {
            try {
                const followersResponse = await getFollowersCount(profile.userId);
                setFollowersCount(followersResponse.count);
            } catch (error) {
                console.error("Failed to fetch followers count and following status:", error);
            }
        };

        fetchFollowers();
    }, [profile?.userId, user?.id]);


    const handleModelClose = () => setModelOpen(false);

    const handleEdit = () => setModelOpen(true);

    const handleSucces = () => {
        handleModelClose();
    }

    const handleUnfollowed = () => {
        setFollowersCount(prev => prev - 1);
    }

    return (
        <Box
            sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gridTemplateRows: "auto auto",
                gap: 2,
                gridTemplateAreas: {
                    xs: `"logo name-and-website"
               "details details"`,
                    sm: `"logo name-and-website"
               "logo details"`,
                },
                mb: 2,
            }}
        >
            {mode === "edit" && (
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        position: "absolute",
                        top: 12,
                        right: 12,
                    }}
                >
                    <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`/company-view/${profile.companyId}`}
                        target="_blank"
                        startIcon={<RemoveRedEyeOutlined />}
                        sx={{ textWrap: "nowrap", display: { xs: "none", sm: "flex" } }}
                    >
                        View Profile
                    </Button>
                    <EditButton onClick={handleEdit} color="primary" />
                </Box>
            )}

            {/* Logo */}
            <Box
                sx={{
                    gridArea: "logo",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: "60px", md: "120px" },
                }}
            >
                {loading ? (
                    <Skeleton variant="circular" width={60} height={60} />
                ) : (
                    <img
                        src={profile?.image || DEAFULT_COMPANY_IMAGE_URL}
                        alt="Company Logo"
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                        }}
                    />
                )}
            </Box>

            {/* Name and Website */}
            <Box
                sx={{
                    gridArea: "name-and-website",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {loading ? (
                    <Skeleton width="60%" height={30} />
                ) : (
                    <Typography variant="h5" fontWeight={600} sx={{ mb: { xs: 0.5, md: 1 } }}>
                        {profile.name}
                    </Typography>
                )}
                {!loading && profile?.website && (
                    <Link
                        href={profile.website}
                        target="_blank"
                        color="primary"
                        sx={{ fontWeight: 600, textDecoration: "none" }}
                    >
                        {profile.website}
                    </Link>
                )}

                {/* Follow Details */}
                <Box sx={{ mt: 1 }}>
                    <FollowersCount count={followersCount} />
                    {mode === "read" && user && user.id != profile.userId && (
                        <Box sx={{
                            mt: 2,
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 2,
                        }}>
                            <MessageButton toId={user.id} />
                            <FollowButton
                                followerId={user.id}
                                followedUserId={profile.userId}
                                followedUserType="company"
                                onUnfollowed={handleUnfollowed} />
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Company Details */}
            <Box
                sx={{
                    gridArea: "details",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mt: 1,
                }}
            >
                {loading ? (
                    Array(4)
                        .fill(0)
                        .map((_, index) => <Skeleton key={index} width="80%" height={50} />)
                ) : (
                    <>
                        {profile?.founded && (
                            <CompanyDetailCard
                                icon={<Business sx={{ fontSize: 25 }} />}
                                label="Founded"
                                value={dateFormatter(profile.founded)}
                            />
                        )}
                        {profile?.employeeCount && (
                            <CompanyDetailCard
                                icon={<People sx={{ fontSize: 25 }} />}
                                label="Employees"
                                value={formatCount(profile?.employeeCount || 0)}
                            />
                        )}
                        {profile?.location && (
                            <CompanyDetailCard
                                icon={<LocationOn sx={{ fontSize: 25 }} />}
                                label="Location"
                                value={`${profile.location.country}, ${profile.location.city}`}
                            />
                        )}
                        {profile?.industry && (
                            <CompanyDetailCard
                                icon={<AccountTree sx={{ fontSize: 25 }} />}
                                label="Industry"
                                value={profile.industry}
                            />
                        )}
                    </>
                )}
            </Box>

            {/* Form */}
            {mode === "edit" && (
                <CustomDialog open={modelOpen} onClose={handleModelClose}>
                    <CompanyInfoForms profile={profile} onSucces={handleSucces} />
                </CustomDialog>
            )}
        </Box>
    );
};

export default CompanyInfoCard;
