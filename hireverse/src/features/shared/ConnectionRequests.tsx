import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import colors from '@core/theme/colors';
import { useState } from 'react';
import { Cancel, CheckCircle } from '@mui/icons-material';


const ConnectionRequests = () => {
  const [connectionRequests, setConnectionRequests] = useState<any[]>([]);

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
        Connection Requests
      </Typography>
      <List>
        {connectionRequests.length > 0 ? (
          connectionRequests.map((request) => (
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
              <ListItemText primary={request.sender} secondary={request.message} sx={{textWrap: "wrap"}} />
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
            No connection requests.
          </Typography>
        )}
      </List>

    </Box>
  );
};

export default ConnectionRequests;
