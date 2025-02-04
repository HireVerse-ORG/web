import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  CircularProgress
} from '@mui/material';
import colors from '@core/theme/colors';
import { useEffect, useState } from 'react';
import { Cancel, CheckCircle } from '@mui/icons-material';
import useGet from '@core/hooks/useGet';
import { acceptFolloweRequest, getMyFollowersRequests, rejectFolloweRequest } from '@core/api/shared/followersApi';
import { IPaginationResponse } from '@core/types/pagination.interface';
import { IFollowersWithProfile } from '@core/types/followers.interface';
import { DEAFULT_COMPANY_IMAGE_URL, DEAFULT_SEEKER_PROFILE_IMAGE_URL } from '@core/utils/constants';
import { momentDateFormatter } from '@core/utils/helper';
import { useNavigate } from 'react-router-dom';
import { useNotificationSocket } from '@core/contexts/NotificationContext';

const FollowRequests = () => {
  const { data, loading, error } = useGet<IPaginationResponse<IFollowersWithProfile> | null>(() =>
    getMyFollowersRequests()
  );

  const [followRequests, setFollowRequests] = useState<IFollowersWithProfile[]>([]);
  const [loadingActions, setLoadingActions] = useState<{ [key: string]: boolean }>({});

  const {setNotificationCount} = useNotificationSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFollowRequests(data.data);
    }
  }, [data]);

  const handleAccept = async (requestId: string) => {
    setLoadingActions((prev) => ({ ...prev, [requestId]: true }));
    try {
      await acceptFolloweRequest(requestId);
      setFollowRequests((prev) => prev.filter((request) => request.id !== requestId));
      setNotificationCount((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to accept follow request:", error);
    } finally {
      setLoadingActions((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  const handleReject = async (requestId: string) => {
    setLoadingActions((prev) => ({ ...prev, [requestId]: true }));
    try {
      await rejectFolloweRequest(requestId);
      setFollowRequests((prev) => prev.filter((request) => request.id !== requestId));
      setNotificationCount((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to reject follow request:", error);
    } finally {
      setLoadingActions((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          padding: 2,
          backgroundColor: colors.secondory.veryLight,
          border: `1px solid ${colors.borderColour}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          width: '100%',
          padding: 2,
          backgroundColor: colors.secondory.veryLight,
          border: `1px solid ${colors.borderColour}`,
        }}
      >
        <Typography variant="body1" color="error">
          Failed to load follow requests.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        backgroundColor: colors.secondory.veryLight,
        border: `1px solid ${colors.borderColour}`,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Follow Requests
      </Typography>
      <List>
        {followRequests.length > 0 ? (
          followRequests.map((request) => {
            const DEFAULT_IMAGE = request.followedUserProfile?.type === "company" ? DEAFULT_COMPANY_IMAGE_URL : DEAFULT_SEEKER_PROFILE_IMAGE_URL;
            const PROFILE_URL = request.followedUserProfile?.type === "company"
              ? `/company-view/${request.followedUserProfile?.publicId}`
              : `/${request.followedUserProfile?.publicId}`;

            return (
              <ListItem
                key={request.id}
                sx={{
                  borderBottom: `1px solid ${colors.borderColour}`,
                  padding: '8px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ListItemAvatar onClick={() => navigate(PROFILE_URL)} sx={{ cursor: "pointer" }}>
                  <Avatar
                    src={request.followedUserProfile?.image || DEFAULT_IMAGE}
                    alt={request.followedUserProfile?.name || 'User'}
                  >
                    {request.followedUserProfile?.name ? request.followedUserProfile.name.charAt(0) : '?'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline', color: 'primary.main' },
                      }}
                      onClick={() => navigate(PROFILE_URL)}
                    >
                      {request.followedUserProfile?.name || 'Unknown User'}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary" component="span">
                      {momentDateFormatter(request.updatedAt)}
                    </Typography>
                  }
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    color="default"
                    size="small"
                    onClick={() => handleReject(request.id)}
                    disabled={loadingActions[request.id]}
                  >
                    <Cancel fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleAccept(request.id)}
                    disabled={loadingActions[request.id]}
                  >
                    <CheckCircle fontSize="small" />
                  </IconButton>
                </Box>
              </ListItem>
            );
          })
        ) : (
          <Typography variant="body1" color="textSecondary">
            No follow requests.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default FollowRequests;
