import colors from '@core/theme/colors';
import { Box, Avatar, Typography } from '@mui/material';
import moment from 'moment';

type InboxChatCardProps = {
  data: {
    name: string;
    image: string;
    lastMessage: string;
    lastMessageTimeStamp?: Date;
  };
  isActive?: boolean;
  isUnread?: boolean;
  onClick: () => void;
};

const InboxChatCard = ({ data, isActive, isUnread=false, onClick }: InboxChatCardProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.3,
        px: 1,
        backgroundColor: isUnread ? 'rgba(0, 123, 255, 0.1)' : isActive ? `secondary.light` : 'transparent',
        borderBottom: `1px solid ${colors.borderColour}`,
        cursor: 'pointer',
        transition: "all 300ms ease",
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {/* Left Side: Avatar */}
      <Avatar
        src={data.image}
        alt={data.name}
        sx={{ width: 56, height: 56, mr: 2 }}
      />

      {/* Right Side: Name, timestamp and last message */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 0.5, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {data.name}
            </Typography>
            {isUnread && <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'blue' }} />}
          </Box>
          {data.lastMessageTimeStamp && (
            <Typography variant="caption" color="text.secondary">
              {moment(data.lastMessageTimeStamp).format("hh:mm A")}
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          {data.lastMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default InboxChatCard;
