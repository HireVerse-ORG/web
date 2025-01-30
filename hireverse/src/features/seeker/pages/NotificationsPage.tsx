import { Box } from '@mui/material';
import ConnectionRequests from '../../shared/ConnectionRequests';
import MyNotifications from '../components/MyNotifications';

const NotificationsPage = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: {xs: "wrap", md: "nowrap"} }}>
      {/* Left Section */}
      <Box sx={{
        width: '100%',
        maxWidth: { xs: "100%", sm: "350px" },
      }}>
        <ConnectionRequests />
      </Box>

      {/* Right Section */}
      <Box sx={{ flexGrow: 1 }}>
        <MyNotifications />
      </Box>
    </Box>
  );
};

export default NotificationsPage;
