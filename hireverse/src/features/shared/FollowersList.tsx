import { getFollowersList, sendFollowRequest } from "@core/api/shared/followersApi";
import useAppSelector from "@core/hooks/useSelector";
import { IFindFollower } from "@core/types/followers.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { DEAFULT_COMPANY_IMAGE_URL, DEAFULT_SEEKER_PROFILE_IMAGE_URL } from "@core/utils/constants";
import { 
  Avatar, 
  Box, 
  Button, 
  CircularProgress, 
  debounce, 
  Skeleton, 
  TextField, 
  Typography 
} from "@mui/material";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type FollowersListProps = {
  userId: string;
};

const FollowersList = ({ userId }: FollowersListProps) => {
  const viewUserId = useAppSelector((state) => state.auth.user?.id);
  const [query, setQuery] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [data, setData] = useState<IPaginationResponse<IFindFollower> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [followRequests, setFollowRequests] = useState<IFindFollower[]>([]);
  const [followLoading, setFollowLoading] = useState<{ [key: string]: boolean }>({});

  const navigate = useNavigate();
  const location = useLocation(); 

  const handleProfileNavigation = (profileUrl: string) => {
    if (location.pathname.includes("company-view")) {
      navigate(profileUrl);
    } else if (location.pathname.includes("seeker") || location.pathname.includes("company")) {
      window.open(profileUrl, "_blank");
    } else {
      navigate(profileUrl);
    }
  };

  const fetchFollowers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFollowersList(userId, 1, 5, query.trim());
      setData(response);
      setFollowRequests(response.data);
    } catch (err) {
      setError("Failed to load followers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFollowers();
    }
  }, [userId, query]);

  const handleFollow = async (followerUserId: string, followerUserType: string) => {
    setFollowLoading((prev) => ({ ...prev, [followerUserId]: true }));
    try {
      await sendFollowRequest({
        followedUserId: followerUserId,
        followedUserType: followerUserType,
      });
      toast.success("Follow request sent!");
      setFollowRequests((prevRequests) =>
        prevRequests.map((fr) =>
          fr.userId === followerUserId ? { ...fr, isMutual: true } : fr
        )
      );
    } catch (error) {
      toast.error("Failed to follow user");
    } finally {
      setFollowLoading((prev) => ({ ...prev, [followerUserId]: false }));
    }
  };

  const debouncedSearch = debounce((value: string) => {
    setQuery(value.trim());
  }, 500);

  const renderSkeletonItem = (key: number) => (
    <Box
      key={key}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      border="1px solid #ddd"
      borderRadius={2}
      gap={2}
    >
      <Skeleton variant="circular" width={50} height={50} />
      <Box flex={1}>
        <Skeleton variant="text" width="40%" height={30} />
        <Skeleton variant="text" width="60%" height={20} />
      </Box>
      <Skeleton variant="rectangular" width={100} height={36} />
    </Box>
  );

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} height={400}>
      {/* Search Box */}
      <TextField
        label="Search Followers"
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={(e) => {setSearchValue(e.target.value); debouncedSearch(e.target.value)}}
        fullWidth
        sx={{ mt: 1 }}
      />

      {loading ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => renderSkeletonItem(index))}
        </>
      ) : !data || data.data.length === 0 ? (
        <Typography textAlign="center">No followers found</Typography>
      ) : (
        followRequests.map((follower) => {
          const DEFAULT_IMAGE =
            follower.userType === "company"
              ? DEAFULT_COMPANY_IMAGE_URL
              : DEAFULT_SEEKER_PROFILE_IMAGE_URL;
          const PROFILE_URL =
            follower.userType === "company"
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
                onClick={() => handleProfileNavigation(PROFILE_URL)}
                sx={{ width: 50, height: 50, marginRight: 2, cursor: "pointer" }}
              />

              <Box flex={1}>
                <Typography
                  fontWeight="bold"
                  onClick={() => handleProfileNavigation(PROFILE_URL)}
                  sx={{ cursor: "pointer", width: "max-content" }}
                >
                  {follower.name || "Unknown"}
                </Typography>
                <Typography variant="body2" color="gray">
                  {follower.title}
                </Typography>
              </Box>

              {follower.userId !== viewUserId && (
                <>
                  {follower.isMutual ? (
                    <Button variant="contained" disabled sx={{ width: 100 }}>
                      Following
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleFollow(follower.userId, follower.userType)}
                      disabled={!!followLoading[follower.userId]}
                      sx={{ width: 100 }}
                    >
                      {followLoading[follower.userId] ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Follow"
                      )}
                    </Button>
                  )}
                </>
              )}
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default FollowersList;
