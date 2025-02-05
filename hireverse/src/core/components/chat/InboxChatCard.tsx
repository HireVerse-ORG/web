import colors from '@core/theme/colors';
import { momentDateFormatter } from '@core/utils/helper';
import { Box, Avatar, Typography } from '@mui/material';

type InboxChatCardProps = {
  data: {
    name: string;
    image: string;
    lastMessage: string;
    lastMessageTimeStamp: Date; 
  };
  isActive?: boolean;
  onClick: () => void;
};

const InboxChatCard = ({ data, isActive, onClick }: InboxChatCardProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.3,
        px: 1,
        backgroundColor: isActive ? `secondary.light` : 'transparent',
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
      <Box sx={{ flex: 1, textWrap: "nowrap", overflow: "hidden" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {data.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {momentDateFormatter(data.lastMessageTimeStamp)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {data.lastMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default InboxChatCard;
