import { Box } from '@mui/material';
import FollowRequests from '../../shared/FollowRequests';
import MyNotifications from '../../shared/MyNotifications';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const handleNotificationClick = (metadata?: Record<string, any>) => {
    if (metadata?.type) {
      switch (metadata.type) {
        case "interview-accepted":
          navigate(`/company/schedules?statuses=accepted`);
          break;
        case "interview-rejected":
          navigate(`/company/schedules?statuses=rejected`);
          break;
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: "wrap", md: "nowrap" } }}>
      {/* Left Section */}
      <Box sx={{
        width: '100%',
        maxWidth: { xs: "100%", sm: "350px" },
      }}>
        <FollowRequests />
      </Box>

      {/* Right Section */}
      <Box sx={{ flexGrow: 1 }}>
        <MyNotifications onClick={handleNotificationClick} />
      </Box>
    </Box>
  );
};

export default NotificationsPage;
