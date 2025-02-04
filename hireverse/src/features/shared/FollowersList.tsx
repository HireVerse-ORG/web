import { getFollowersList } from "@core/api/shared/followersApi";
import useGet from "@core/hooks/useGet";
import useAppSelector from "@core/hooks/useSelector";
import { IFindFollower } from "@core/types/followers.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { DEAFULT_COMPANY_IMAGE_URL, DEAFULT_SEEKER_PROFILE_IMAGE_URL } from "@core/utils/constants";
import { Avatar, Box, Button, CircularProgress, Typography } from "@mui/material";

type FollowersListProps = {
    userId: string;
};

const FollowersList = ({ userId }: FollowersListProps) => {
    const viewUserId = useAppSelector(state => state.auth.user?.id);
    const { data, loading, error } = useGet<IPaginationResponse<IFindFollower>>(() => getFollowersList(userId, 1, 10));


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <Typography color="error">Failed to load followers</Typography>
            </Box>
        );
    }

    if (!data || data.data.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <Typography>No followers found</Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {data.data.map((follower) => {
                const DEFAULT_IMAGE = follower.userType === "company" ? DEAFULT_COMPANY_IMAGE_URL : DEAFULT_SEEKER_PROFILE_IMAGE_URL;
                const PROFILE_URL = follower.userType === "company"
                    ? `/company-view/${follower.publicId}`
                    : `/${follower.publicId}`;

                return (
                    <Box
                        key={follower.followId}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        padding={2}
                        border="1px solid #ddd"
                        borderRadius={2}
                    >
                        <Avatar 
                            src={follower.image || DEFAULT_IMAGE} 
                            alt={follower.name}
                            onClick={() => window.location.href=PROFILE_URL} 
                            sx={{ width: 50, height: 50, marginRight: 2, cursor: "pointer" }} />

                        <Box flex={1}>
                            <Typography fontWeight="bold" onClick={() => window.location.href=PROFILE_URL} sx={{cursor: "pointer"}}>{follower.name || "Unknown"}</Typography>
                            <Typography variant="body2" color="gray">{follower.title}</Typography>
                        </Box>

                        {follower.userId !== viewUserId && follower.isMutual ? (
                            <Button variant="contained" disabled>
                                Following
                            </Button>
                        ) : follower.userId !== viewUserId && (
                            <Button variant="contained" color="primary">
                                Follow
                            </Button>
                        )}
                    </Box>
                )
            })}
        </Box>
    );
};

export default FollowersList;
