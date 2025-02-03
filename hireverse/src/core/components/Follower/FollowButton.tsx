import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

type FollowButtonProps = {
    id: string;
    isFollowing?: boolean
};

const FollowButton = ({ id, isFollowing: userFollowed }: FollowButtonProps) => {
    const [isFollowing, setIsFollowing] = useState<boolean | null>(userFollowed || null);

    useEffect(() => {
        if(!userFollowed){
            // Fetch follow status from API here
        }
    }, [userFollowed, id]);

    const handleFollow = async () => {
        try {
            // await followCompany(companyId);
            setIsFollowing(true);
        } catch (error) {
            console.error("Error following company", error);
        }
    };

    const handleUnfollow = async () => {
        try {
            // await unfollowCompany(companyId);
            setIsFollowing(false);
        } catch (error) {
            console.error("Error unfollowing company", error);
        }
    };

    if (isFollowing === null) return null; 

    return isFollowing ? (
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
    ) : (
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
