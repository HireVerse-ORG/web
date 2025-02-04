import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Favorite, FavoriteBorder, HeartBroken } from "@mui/icons-material";
import { IFollowers } from "@core/types/followers.interface";
import { getfollowDetails, sendFollowRequest, unFollow } from "@core/api/shared/followersApi";
import { UserRoles } from "@core/types/user.interface";
import { toast } from "sonner";

type FollowButtonProps = {
    followerId: string;
    followedUserId: string;
    followedUserType: UserRoles;
    onUnfollowed?: () => void;
};

const FollowButton = ({ followerId, followedUserId, followedUserType, onUnfollowed }: FollowButtonProps) => {
    const [followDetails, setFollowDetails] = useState<IFollowers | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!followerId || !followedUserId) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                const { followDetails } = await getfollowDetails(followedUserId);
                setFollowDetails(followDetails);
            } catch (error) {
                console.error("Failed to fetch follow details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [followerId, followedUserId]);

    const handleFollow = async () => {
        setLoading(true);
        try {
            const details = await sendFollowRequest({
                followedUserId,
                followedUserType
            })
            setFollowDetails(details)
        } catch (error) {
            toast.error("Failed to following user");
        } finally {
            setLoading(false);
        }
    };

    const handleUnfollow = async () => {
        setLoading(true);
        try {
            await unFollow(followedUserId);
            setFollowDetails(null)
            onUnfollowed?.();
        } catch (error) {
            toast.error("Failed to unFollow user");
        } finally {
            setLoading(false);
        }
    };

    const isFollowing = followDetails?.requestStatus === "accepted";
    const isPending = followDetails?.requestStatus === "pending";

    if (loading) {
        return (
            <Button
                variant="contained"
                color="primary"
                size="small"
                disabled
                sx={{width: 100}}
            >
                <CircularProgress size={20} />
            </Button>
        );
    }

    if (isPending) {
        return (
            <Button
                variant="outlined"
                color="info"
                size="small"
                startIcon={<HeartBroken />}
                disabled
                sx={{
                    borderColor: "info.main",
                    color: "info.main",
                }}
            >
                Pending
            </Button>
        );
    } else if (isFollowing) {
        return (
            <Button
                onClick={handleUnfollow}
                variant="outlined"
                color="error"
                size="small"
                startIcon={<Favorite />}
                sx={{
                    borderColor: "error.main",
                    color: "error.main",
                    "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                    },
                }}
            >
                Unfollow
            </Button>
        );
    }

    return (
        <Button
            onClick={handleFollow}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<FavoriteBorder />}
            sx={{
                "&:hover": {
                    backgroundColor: "primary.dark",
                },
            }}
        >
            Follow
        </Button>
    );
};

export default FollowButton;
