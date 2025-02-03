import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import colors from '@core/theme/colors';
import { useEffect, useState } from 'react';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { FollowRequestWithProfile } from '@core/types/followersRequest.interface';
import { getMyFollowRequest } from '@core/api/shared/followerRequestApi';
import { IPaginationResponse } from '@core/types/pagination.interface';
import useGet from '@core/hooks/useGet';


const FollowRequests = () => {
  const { data, loading, error } = useGet<IPaginationResponse<FollowRequestWithProfile>>(() => getMyFollowRequest('accepted'));
  const [followRequests, setFollowRequests] = useState<FollowRequestWithProfile[]>([]);

  useEffect(() => {
    if(data){
      setFollowRequests(data.data);
    }
  }, [data]);

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
          followRequests.map((request) => (
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
              <ListItemText primary={request.targetProfile.name} secondary={"You"} sx={{textWrap: "wrap"}} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="primary" size="small">
                  <CheckCircle fontSize="small" />
                </IconButton>
                <IconButton color="default" size="small">
                  <Cancel fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
          ))
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
