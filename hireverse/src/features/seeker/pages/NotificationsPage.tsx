import { Box } from '@mui/material';
import FollowRequests from '../../shared/FollowRequests';
import MyNotifications from '../../shared/MyNotifications';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const handleNotificationClick = (metadata?: Record<string, any>) => {
    if (metadata?.type) {
      switch (metadata.type) {
        case "resume-comment":
          navigate(`/seeker/my-application/${metadata?.job_application_id}`);
          break;
        case "interview-schedule": 
          navigate(`/seeker/schedules?statuses=scheduled`);
          break;
        case "job-offered":
          if(metadata.job_application_id){
            navigate(`/seeker/my-application/${metadata?.job_application_id}?tab=offer-letter`);
          } 
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
